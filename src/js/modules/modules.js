const modules = () => {
	function bindModal(
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay = true
	) {
		const triggers = document.querySelectorAll(triggerSelector)
		const modal = document.querySelector(modalSelector)
		const close = document.querySelector(closeSelector)
		const windows = document.querySelectorAll('[data-modal]')

		//Функции повтора кода--------------------------------
		const hideWindow = () => {
			windows.forEach(window => {
				window.style.display = 'none'
			})
		}

		const closeModal = () => {
			modal.style.display = 'none'
			document.body.classList.remove('modal-open')
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

	bindModal(
		'.popup_engineer_btn',
		'.popup_engineer',
		'.popup_engineer .popup_close'
	)
	bindModal('.phone_link', '.popup', '.popup .popup_close')
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close')
	bindModal(
		'.popup_calc_button',
		'.popup_calc_profile',
		'.popup_calc_profile_close',
		false
	)
	bindModal(
		'.popup_calc_profile_button',
		'.popup_calc_end',
		'.popup_calc_end_close',
		false
	)
	// showModalByTime('.popup', 60000)
}

export default modules
