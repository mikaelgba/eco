const button_search = document
    .querySelector("#page-home main a")
const modal = document
    .querySelector("#modal")
const close_searsh = document
    .querySelector("#modal .header a")

button_search.addEventListener("click", () => {

    modal.classList.remove("hide")
})

close_searsh.addEventListener("click", () => {

    modal.classList.add("hide")
})