
export const handleUpdate = (id,data) => {
    const url = import.meta.env.VITE_ROOT_URL+"/cars/"+ id;
    const accessToken = localStorage.getItem('accessToken');
    console.log(url);


    const options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data)
    }

    fetch(url,options)
    .then(response => {
        if(!response.ok){
            throw new Error("Update request error");
        }
    })
    .then(
        // localStorage.removeItem("id")
        alert("car updated successfully")
    );

}