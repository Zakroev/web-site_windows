const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector) {
    const triggers = document.querySelectorAll(triggerSelector)
    const modal = document.querySelector(modalSelector)
    const close = document.querySelector(closeSelector)

    const closeModal = () => {
      modal.style.display = 'none'
      document.body.classList.remove('modal-open')
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault()
        }
        modal.style.display = 'block'
        document.body.classList.add('modal-open')
      })
    })

    close.addEventListener('click', () => {
      closeModal()
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal()
      }
    })

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    })
  }

  const showModalBytime = (selector, time) => {
    setTimeout(() => {
      document.querySelector(selector).style.display = 'block'
      document.body.style.overflow = ''
    }, time)
    showModalBytime('.popup', 3000)
  }

  bindModal(
    '.popup_engineer_btn',
    '.popup_engineer',
    '.popup_engineer .popup_close'
  )
  bindModal('.phone_link', '.popup', '.popup .popup_close')
  showModalBytime('.popup', 3000)
}

export default modals
