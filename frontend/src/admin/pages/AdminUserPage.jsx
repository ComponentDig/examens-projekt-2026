import AddUserForm from "../components/AddUserForm";

const AdminUserPage = () => {

    return (
        <>
        <div className="">
            <h1 className="">Hantera hästägare</h1>

            <div className="">
                <AddUserForm />
            </div>

            <div className="">
                <h2 className="">Registrera ny användare</h2>
                <p className="">lista på användare</p>
            </div>
        </div>
        </>
    )
}

export default AddUserForm;