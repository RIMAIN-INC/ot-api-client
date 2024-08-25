export const handleDelete = async (value) => {

    const url = import.meta.env.VITE_ROOT_URL+ "/cars/"+ value;

    const accessToken = localStorage.getItem('accessToken')
    const options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        }
    }
    

    fetch(url,options)
    .then(response => {
        console.log(response);
        if(!response.ok) {
            throw new Error("Delete Request Error")
        }
    }).then(alert("Car deleted successfully"));
}
