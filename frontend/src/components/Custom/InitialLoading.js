// Animacija preuztea sa open source CSS loading animations
import './initial-loading.css'

const InitialLoading = () => {
    return (
        <div style={{ height: "100vh", width: "100vw", background: "#008374" }}>
            <div className="lds-dual-ring">
            </div>
        </div>
    )
}
export default InitialLoading