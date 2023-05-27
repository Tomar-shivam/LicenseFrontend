import './loader.css';

const Loader = (props) => {

    return (
        <div className={props.clss ?props.clss : "loader-contentV1"}>
            <div className="loader">
                <div className="loading"></div>
                <h5>Loading...</h5>
            </div>
        </div>

    );
}


export default Loader;