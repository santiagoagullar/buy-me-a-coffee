import React, { useEffect, useContext, useState } from "react"
import './Header.scss'
import coffee from '../../../assets/coffee.png'
import { MemoContext } from "../Context/MemoContext"

const Input = ({ placeholder, name, type, value, handleChange, className, maxLength }) => (
	<input
		placeholder={placeholder}
		type={type}
		step="0.0001"
		value={value}
		className={className}
		maxLength={maxLength}
		onChange={(e) => handleChange(e, name)}
	>
	</input>
)

const Header = () => {

	const [formResponse, setFormResponse] = useState('')
	const { connectWallet, wallet, checkIfWalletIsConnected, handleChange, formData, sendMemo, memos } = useContext(MemoContext)

	useEffect(() => {
		checkIfWalletIsConnected()
		//eslint-disable-next-line
	}, [])

	const handleSubmit = (e) => {
		const { from } = formData
		console.log(formData)

		e.preventDefault()

		if (!from) {
			setFormResponse('error')
			return
		}
		sendMemo()
	}

	console.info(memos)

	return (
		<main>
			<div className="intro-container">
				<div className="intro-text">
					<h2>Send <code>Santiago</code> a coffee!</h2>
					<p>By using <strong>coffee-pal</strong> you can send some ETH, for what a coffee is worth!</p>
					<p>Send a coffee as a way to support along with a nice message!</p>
				</div>
				<div className="img-container">
					<img src={coffee}></img>
				</div>
			</div>
			<div className="transfer-container">
				<div className="img-container">
					<img src={coffee}></img>
				</div>
				<div className="input-container">
					<Input placeholder="From" name="from" type="text" className={`from ${formResponse}`} maxLength="20" handleChange={handleChange} />
					<Input placeholder="Message" name="message" type="text" className={`message ${formResponse}`} maxLength="20" handleChange={handleChange} />
					{formResponse === 'error' && (
						<code className="error_message">Enter who the coffee is from!</code>
					)}
					<button onClick={wallet === 'connected' ? handleSubmit : () => connectWallet()}>
						{wallet === 'connected' ? (
							<code>Buy a Coffee for 0.001 ETH</code>
						) : (
							<code>Connect to your wallet</code>
						)}
					</button>
				</div>
			</div>
			<div className="intro-container-mobile">
				<div className="intro-text-mobile">
					<h2>Send <code>Santiago</code> a coffee!</h2>
					<p id="tuvieja">By using <strong>coffee-pal</strong> you can send some ETH, for what a coffee is worth!</p>
					<p id="tuviejaentanga">Send a coffee as a way to support along with a nice message!</p>
				</div>
				<div className="img-container-mobile">
					<img src={coffee}></img>
				</div>
				<div className="input-container-mobile">
					<Input placeholder="From" name="from" type="text" className={`from ${formResponse}`} maxLength="20" handleChange={handleChange} />
					<Input placeholder="Message" name="message" type="text" className={`message ${formResponse}`} maxLength="20" handleChange={handleChange} />
					{formResponse === 'error' && (
						<code className="error_message">Enter who the coffee is from!</code>
					)}
					<button onClick={wallet === 'connected' ? handleSubmit : () => connectWallet()}>
						{wallet === 'connected' ? (
							<code>Buy a Coffee for 0.001 ETH</code>
						) : (
							<code>Connect to your wallet</code>
						)}
					</button>
				</div>
			</div>
		</main>
	)
}

export default Header