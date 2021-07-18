document.addEventListener('DOMContentLoaded', function () {

    const toggleItems = document.querySelectorAll('.item')
    const elementCopy = document.querySelector("[data-copy='copy']")
    const inviteReferral = document.querySelector("[data-referral]")
    const focusItems = document.querySelectorAll(".focus-in")
    const forms = document.querySelectorAll("form")

    toggleItems.forEach(toggleItem => {
        toggleItem.addEventListener('click', toggleClass)
    })

    forms.forEach(submitForm => {
        submitForm.addEventListener('submit', submitForms)
    })

    focusItems.forEach(focusItem => {
        focusItem.addEventListener('click', onChangeInput)
        focusItem.addEventListener('keyup', onChangeInput)
    })

    elementCopy.addEventListener('click', copyTextFromElement)
    inviteReferral.addEventListener('click', referralProgram)
    inviteReferral.addEventListener('click', referralProgram)

    function toggleClass() {
        this.classList.toggle('active')
    }

    function copyTextFromElement() {
        const elementText = this.previousElementSibling.textContent
        copyText(elementText)
    }

    function copyText(text) {
        navigator.clipboard.writeText(text)
    }

    const changeBalance = document.querySelector("[data-balance]")
    let balanceValue = +changeBalance.textContent.replace(/(,*[^,]*),/g, "$1")

    function referralProgram() {
        balanceValue += 25600
        const newBalance = balanceValue.toLocaleString().replace(/\s+/g, ",").substring(0, balanceValue.toLocaleString().length - 1);
        changeBalance.textContent = newBalance

            + this.previousElementSibling.textContent++
    }

    const modals = document.querySelectorAll('[data-modal]')

    modals.forEach(modal => {
        modal.addEventListener('click', toggleModal)
    })

    function toggleModal() {
        const idModal = this.getAttribute('data-modal')
        const backdropModal = document.querySelector('.modal-backdrop')

        backdropModal.style.opacity = 1
        backdropModal.style.zIndex = 99
        document.body.style.overflow = 'hidden'
        document.body.appendChild(backdropModal)

        openModal(idModal)

        backdropModal.addEventListener('click', function () {

            setTimeout(() => {
                backdropModal.style.opacity = 0
                backdropModal.style.zIndex = -99
                document.body.style.overflow = ''
            }, 400)

            closeModal(idModal);
        })
    }

    function openModal(id) {
        const modal = document.querySelector(`#${id}`)

        modal.style.display = 'flex'
        modal.style.flexDirection = 'column'
        modal.style.justifyContent = 'space-between'
        modal.style.position = 'fixed'
        modal.style.top = '50%'
        modal.style.left = '50%'
        modal.style.transform = 'translate(-50%, -50%)'
        modal.style.opacity = 1
    }

    function closeModal(id) {
        const modal = document.querySelector(`#${id}`)

        modal.style.opacity = 0

        setTimeout(() => {
            modal.style.display = 'none'
        }, 400)
    }

    function onChangeInput() {
        const btnSubmit = this.nextElementSibling

        this.value.length > 0 ? btnSubmit.removeAttribute('disabled')
            : btnSubmit.setAttribute('disabled', 'disabled')
    }


    function submitForms(e) {

        const backdropModal = document.querySelector('.modal-backdrop')

        e.preventDefault()
        this.querySelector('.modal-body').innerHTML = ''
        this.querySelector('.modal-body').insertAdjacentHTML('afterbegin', '<p class="success">Успешно отправлено!</p>')

        setTimeout(() => {
            backdropModal.style.opacity = 0
            this.style.opacity = 0
        }, 1500)

        setTimeout(() => {
            backdropModal.remove()
            document.body.style.overflow = ''
            this.style.display = 'none'
        }, 2000)
    }

})