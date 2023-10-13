const timer = (id, deadline) => {
	const addZero = num => {
		if (num <= 9) {
			return '0' + num
		} else {
			return num
		}
	}

	const getTimeRemaining = endTime => {
		const total = Date.parse(endTime) - Date.parse(new Date())
		const seconds = Math.floor((total / 1000) % 60)
		const minutes = Math.floor((total / 1000 / 60) % 60)
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
		const days = Math.floor(total / (1000 * 60 * 60 * 24))

		return {
			total,
			days,
			hours,
			minutes,
			seconds
		}
	}

	const setClock = (selector, endTime) => {
		const timeSelector = document.querySelector(selector)
		const days = timeSelector.querySelector('#days')
		const hours = timeSelector.querySelector('#hours')
		const minutes = timeSelector.querySelector('#minutes')
		const seconds = timeSelector.querySelector('#seconds')

		const updateClock = () => {
			const time = getTimeRemaining(endTime)

			days.textContent = addZero(time.days)
			hours.textContent = addZero(time.hours)
			minutes.textContent = addZero(time.minutes)
			seconds.textContent = addZero(time.seconds)

			if (time.total <= 0) {
				days.textContent = '00'
				hours.textContent = '00'
				minutes.textContent = '00'
				seconds.textContent = '00'
				clearInterval(timeInterval)
			}
		}

		const timeInterval = setInterval(updateClock, 1000)
		updateClock()
	}

	setClock(id, deadline)
}

export default timer
