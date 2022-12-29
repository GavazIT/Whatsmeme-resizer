const form = document.querySelector('#my-form');

form.addEventListener('change', async (e) => {
    e.preventDefault();

    // Get data URI of the selected image
    const formData = new FormData(e.currentTarget);
    const photoField = formData.get('photo');

    const dataUri = await dataUriFromFormField(photoField);

    const imgEl = document.createElement('img');


    imgEl.addEventListener('load', () => {
        const intensity = document.getElementById("intensity").value;
        var width;
        switch (intensity) {
            case "0":
                width = 150;
                break;
            case "1":
                width = 100;
                break;
            case "2":
                width = 50;
                break;
        }
        console.log(width);
        const resizedDataUri = resizeImage(imgEl, width);
        document.querySelector('#img-preview').src = resizedDataUri;
    });
    imgEl.src = dataUri;
});

function dataUriFromFormField(field) {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            resolve(reader.result);
        });

        reader.readAsDataURL(field);
    });
}

function resizeImage(imgEl, wantedWidth) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const aspect = imgEl.width / imgEl.height;

    canvas.width = wantedWidth;
    canvas.height = wantedWidth;

    ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
}