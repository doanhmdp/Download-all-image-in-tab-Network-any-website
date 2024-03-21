// Lấy tất cả các yêu cầu từ tab Network
const requests = performance.getEntriesByType("resource");

const imageRequests = requests.filter(request => request.initiatorType === 'img');

let downloadedCount = 0;

imageRequests.forEach((imageRequest, index) => {
    setTimeout(() => {
        const url = imageRequest.name;
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const imageURL = URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = imageURL;
                link.download = url.substring(url.lastIndexOf('/') + 1);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                downloadedCount++;
                console.log(`Downloaded: ${url}`);
                
                if (downloadedCount === imageRequests.length) {
                    console.log(`Total images downloaded: ${downloadedCount}`);
                }
            })
            .catch(error => console.error(`Error downloading ${url}: ${error}`));
    }, 300 * index); // Mỗi ảnh được tải sau 0.3 giây
});

// In ra tổng số ảnh đã tải xuống 
setTimeout(() => {
    console.log(`Total images downloaded: ${downloadedCount}`);
}, 300 * imageRequests.length);
