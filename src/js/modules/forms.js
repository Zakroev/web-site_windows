const formsFunction = () => {
	const forms = document.querySelectorAll('form')
	const inputs = document.querySelectorAll('input')
	const phoneInputs = document.querySelectorAll('input[name = "user_phone"]')

	phoneInputs.forEach(input => {
		input.addEventListener('input', () => {
			input.value = input.value.replace(/\D/, '')
		})
	})

	const message = {
		loading: 'Загрузка',
		success: 'Спасибо! Мы с вами свяжемся',
		failure: 'Что-то пошло не так'
	}

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading

		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		return await res.text()
	}

	const clearInputs = () => {
		inputs.forEach(input => {
			input.value = ''
		})
	}

	forms.forEach(form => {
		form.addEventListener('submit', e => {
			e.preventDefault()

			const statusMessage = document.createElement('div')
			statusMessage.classList.add('status')
			form.appendChild(statusMessage)

			const formData = {}
			const formInputs = form.querySelectorAll('input')

			formInputs.forEach(input => {
				formData[input.name] = input.value
			})

			postData('https://my-server-ivpu.onrender.com', formData)
				.then(res => {
					statusMessage.textContent = message.success
				})
				.catch(() => {
					statusMessage.textContent = message.failure
				})
				.finally(() => {
					clearInputs()
					setTimeout(() => {
						statusMessage.remove()
					}, 5000)
				})
		})
	})
}
export default formsFunction
