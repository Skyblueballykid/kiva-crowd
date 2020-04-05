export default {
    getLenders() {
        return fetch('/api/lender/')
            .then(res => res.json())
            .then(
                (data) => {
                    return data.results;
                }
            )
            .catch(console.log);
    }
}