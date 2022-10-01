import React, { useContext } from 'react'
import './Transactions.scss'
import { MemoContext } from "../Context/MemoContext"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const MemoCard = ({ from, message }) => {
	if (message.length > 20) message = message.substring(0, 20);

	return (
		<div className='memo_card'>
			<p>From: <strong>{from}</strong></p>
			<p>Message: <strong>{message}</strong></p>
		</div>
	)
}

const Transactions = () => {

	const { memos } = useContext(MemoContext)

	return (
		<div className='memos'>
			<div className='memos__header'>
				<h1>
					Latest Coffees
				</h1>
			</div>
			<Swiper
				modules={[Navigation, EffectFade]}
				navigation
				effect
				freeMode
				grabCursor
				loop
				speed={800}
				slidesPerView={5}
				spaceBetween={30}
				className='memos_container'
				breakpoints={{
					1280: {
						slidesPerView: 5,
						spaceBetween: 30
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 15
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 15
					},
					480: {
						slidesPerView: 2,
						spaceBetween: 10
					},
					0: {
						slidesPerView: 1,
						spaceBetween: 10
					},
				}}
			>
				<div className='swiper_slide_container'>
					{[...memos].reverse().slice(0, 20).map((memo, i) => (
						<SwiperSlide className='memo_card_container'>
							<MemoCard key={i} {...memo} />
						</SwiperSlide>
					))}
				</div>
			</Swiper>
		</div >
	)
}

export default Transactions