
export default function ItemCards() {
    return(
        <>
            <div className="m-3 p-2 rounded-3 shadow d-flex align-items-center gap-2">
                <img src='../images/Thali.png' alt="Food-item" height={50}/>
                <p style={{fontSize  : "10px"}} className="mb-0">Vermicelli Upma</p>

                <div className="d-flex align-items-center">
                    <button className="rounded-5 btn btn-custom  py-1">-</button>
                    <p style={{fontSize  : "10px"}} className="mb-0">Vermicelli Upma</p>
                </div>
            </div>
        </>
    )
}