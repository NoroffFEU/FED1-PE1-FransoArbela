export const showLoadingMessage = () => {
    const loadingMessage = document.createElement('div');
    loadingMessage.id = 'loadingMessage';
    loadingMessage.innerText = 'Loading...';
    document.body.appendChild(loadingMessage);
}

export const hideLoadingMessage=()=> {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        document.body.removeChild(loadingMessage);
    }
}