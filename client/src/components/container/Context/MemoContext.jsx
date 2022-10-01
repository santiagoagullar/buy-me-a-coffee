import React, { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { contract_abi, contract_address } from '../../../utils/constants'

export const MemoContext = React.createContext();

const { ethereum } = window;

const createContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum)
	const signer = provider.getSigner()
	const memosContract = new ethers.Contract(contract_address, contract_abi, signer)

	return memosContract
}

export const MemosProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState("")
	const [wallet, setWallet] = useState("connected")
	const [formData, setformData] = useState({ from: '', message: '' })
	const [loading, setLoading] = useState('')
	const [memos, setMemos] = useState([])

	const handleChange = (e, name) => {
		setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};

	useEffect(() => {
		getAllMemos()
	}, [])


	const sendMemo = async () => {
		try {
			if (ethereum) {
				setLoading('sending')
				const { from, message } = formData
				const memosContract = createContract()

				const transactionHash = await memosContract.buyCoffee(
					from,
					message,
					{ value: ethers.utils.parseEther("0.001") },
				)

				await transactionHash.wait()
				setLoading('sent')
				setTimeout(() => {
					setLoading('')
				}, 3000)

			} else {
				console.log("Install metamask!")
			}
		} catch (error) {
			console.error(error)
			setLoading('failure')
			setTimeout(() => {
				setLoading('')
			}, 3000)

			throw new Error("No ethereum object");
		}
	}

	const getAllMemos = async () => {
		try {
			if (ethereum) {
				const memosContract = createContract()

				const memos = await memosContract.getMemos()

				const structuredMemos = memos.map((memo) => ({
					from: memo.name,
					message: memo.message,
				}))

				setMemos(structuredMemos);
			} else {
				console.log("Ethereum is not present");
			}
		} catch (error) {
			console.error(error)
			console.log("no ethereum")
		}
	}

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask.")

			const accounts = await ethereum.request({ method: "eth_accounts" })

			if (accounts.length) {
				setCurrentAccount(accounts[0])
				setWallet('connected')
			} else {
				setWallet('')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const connectWallet = async () => {
		setWallet('midway')
		try {
			if (!ethereum) return alert("Please install MetaMask.");

			const accounts = await ethereum.request({ method: "eth_requestAccounts", });

			setCurrentAccount(accounts[0]);
			setWallet('connected')
		} catch (error) {
			setWallet("")

			throw new Error("No ethereum object");
		}
	}

	return (
		<MemoContext.Provider value={{
			connectWallet,
			wallet,
			checkIfWalletIsConnected,
			handleChange,
			formData,
			sendMemo,
			loading,
			currentAccount,
			memos
		}}>
			{children}
		</MemoContext.Provider>
	)
}