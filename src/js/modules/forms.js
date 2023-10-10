import checkNumInputs from './checkNumInputs'

const formsFunction = state => {
	const forms = document.querySelectorAll('form')
	const inputs = document.querySelectorAll('input')

	checkNumInputs('input[name = "user_phone"]')

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

			const formData = new FormData(form)
			if (form.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key])
				}
			}

			const formInputs = form.querySelectorAll('input')

			formInputs.forEach(input => {
				formData.append(input.name, input.value)
			})

			postData('https://simple-server-cumz.onrender.com/api/data', formData)
				.then(res => {
					console.log(res)
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
