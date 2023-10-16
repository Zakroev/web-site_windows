const modules = () => {
	function bindModal({
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay = true
	}) {
		const triggers = document.querySelectorAll(triggerSelector)
		const modal = document.querySelector(modalSelector)
		const close = document.querySelector(closeSelector)
		const windows = document.querySelectorAll('[data-modal]')
		const scroll = calcScroll()

		//Функции повтора кода--------------------------------
		const hideWindow = () => {
			windows.forEach(window => {
				window.style.display = 'none'
			})
		}

		const closeModal = () => {
			modal.style.display = 'none'
			document.body.classList.remove('modal-open')
			document.body.style.marginRight = `0px`
		}
		//Блок с фунциями повтора кода окончен ------------------------

		triggers.forEach(trigger => {
			trigger.addEventListener('click', e => {
				if (e.target) {
					e.preventDefault()
				}

				hideWindow()

				modal.style.display = 'block'
				document.body.classList.add('modal-open')
				document.body.style.marginRight = `${scroll}px`
			})
		})

		close.addEventListener('click', () => {
			hideWindow()
			closeModal()
		})

		modal.addEventListener('click', e => {
			if (e.target === modal && closeClickOverlay) {
				hideWindow()
				closeModal()
			}
		})

		window.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				closeModal()
			}
		})
	}

	const showModalByTime = (selector, time) => {
		setTimeout(() => {
			document.querySelector(selector).style.display = 'block'
			document.body.style.overflow = ''
		}, time)
		showModalByTime('.popup', 3000)
	}

	const calcScroll = () => {
		const div = document.createElement('div')

		div.style.width = '50px'
		div.style.height = '50px'
		div.style.overflowY = 'scroll'
		div.style.visibility = 'hidden'

		document.body.appendChild(div)
		const scrollWidth = div.offsetWidth - div.clientWidth
		div.remove

		return scrollWidth
	}

	bindModal({
		triggerSelector: '.popup_engineer_btn',
		modalSelector: '.popup_engineer',
		closeSelector: '.popup_engineer .popup_close'
	})
	bindModal({
		triggerSelector: '.phone_link',
		modalSelector: '.popup',
		closeSelector: '.popup .popup_close'
	})
	bindModal({
		triggerSelector: '.popup_calc_btn',
		modalSelector: '.popup_calc',
		closeSelector: '.popup_calc_close'
	})
	bindModal({
		triggerSelector: '.popup_calc_button',
		modalSelector: '.popup_calc_profile',
		closeSelector: '.popup_calc_profile_close',
		closeClickOverlay: false
	})
	bindModal({
		triggerSelector: '.popup_calc_profile_button',
		modalSelector: '.popup_calc_end',
		closeSelector: '.popup_calc_end_close',
		closeClickOverlay: false
	})
	// showModalByTime('.popup', 60000)
}

export default modules
