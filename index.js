function displayElementsInArray(arr, parent) {
    let fakeDom = '';
    arr.forEach(element => {
        fakeDom += element;
    });
    parent.innerHTML = fakeDom;
}