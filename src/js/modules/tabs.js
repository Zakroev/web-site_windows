const tabs = ({
	headerSelector,
	tabSelector,
	contentSelector,
	activeClass,
	display = 'block'
}) => {
	const header = document.querySelector(headerSelector)
	const tabs = document.querySelectorAll(tabSelector)
	const tabContents = document.querySelectorAll(contentSelector)

	const hideTabContent = () => {
		tabContents.forEach(content => {
			content.style.display = 'none'
		})

		tabs.forEach(tab => {
			tab.classList.remove(activeClass)
		})
	}

	const showTabContent = (i = 0) => {
		tabContents[i].style.display = display
		tabs[i].classList.add(activeClass)
	}

	hideTabContent()
	showTabContent()

	const tabEnterClick = target => {
		tabs.forEach((tab, i) => {
			if (target === tab || target.parentNode === tab) {
				hideTabContent()
				showTabContent(i)
			}
		})
	}

	header.addEventListener('click', e => {
		const target = e.target
		if (
			target &&
			(target.classList.contains(tabSelector.replace(/\./, '')) ||
				target.parentNode.classList.contains(tabSelector.replace(/\./, '')))
		) {
			tabEnterClick(target)
			tabs.forEach((item, i) => {
				if (target === item || target.parentNode === item) {
					hideTabContent()
					showTabContent(i)
				}
			})
		}
	})
	header.addEventListener('keydown', e => {
		const target = e.target
		if (e.key === 'Enter') {
			tabEnterClick(target)
		}
	})
}

export default tabs
