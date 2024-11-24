import { useState } from "react"
import './WithLoading.css'

const WithLoading = (WrappedComponent) => {
    const WithLoadingCoponent = (props) => {
        const [isLoading, setIsLoading] = useState(false);
        
        const handleShowLoading = (isLoading) => {
            setIsLoading(isLoading)
            //setIsLoading(true)
        }

        return (
            <div className="loading-container">
                {   
                    isLoading &&
                    <div className="loading-content">
                        <div className="loading-main">
                            <img src="images/loading.gif" />
                            <h4>Loading...</h4>
                        </div>
                    </div>
                }
                <WrappedComponent {...props} showLoading={handleShowLoading}/>
            </div>
        )
    }
    return WithLoadingCoponent;
}

export default WithLoading;