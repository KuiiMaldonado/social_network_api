//Getter for createdAt field
function formatDate(createdAt) {
    //Empty array to grab the browser's default locale.
    let options = {year: 'numeric', month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit'};
    return createdAt.toLocaleString([], options);
}

module.exports = formatDate;