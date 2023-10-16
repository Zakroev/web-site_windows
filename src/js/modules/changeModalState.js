import checkNumInputs from './checkNumInputs'

const changeModalState = state => {
	const windowForm = document.querySelectorAll('.balcon_icons_img')
	const windowWidth = document.querySelectorAll('#width')
	const windowHeight = document.querySelectorAll('#height')
	const windowType = document.querySelectorAll('#view_type')
	const windowProfile = document.querySelectorAll('.checkbox')

	checkNumInputs('#width')
	checkNumInputs('#height')

	const bindActionsToElems = ({ event, elem, prop }) => {
		elem.forEach((item, i) => {
			item.addEventListener(event, () => {
				switch (item.nodeName) {
					case 'SPAN':
						state[prop] = i
						break
					case 'INPUT':
					case 'SELECT':
						state[prop] = item.value
						break
				}
			})
		})
	}

	bindActionsToElems({ event: 'click', elem: windowForm, prop: 'form' })
	bindActionsToElems({ event: 'input', elem: windowHeight, prop: 'height' })
	bindActionsToElems({ event: 'input', elem: windowWidth, prop: 'width' })
	bindActionsToElems({ event: 'change', elem: windowType, prop: 'type' })
	bindActionsToElems({ event: 'change', elem: windowProfile, prop: 'profile' })
}

export default changeModalState
