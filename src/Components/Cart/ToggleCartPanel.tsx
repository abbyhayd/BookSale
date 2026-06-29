import { useState } from "react"
import { CartPanel } from "./CartPanel"

export function ToggleCartPanel(){
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

    const togglePanel = () =>{
        setIsCartOpen(oldToggle => !oldToggle)
    }

    return(
        <section>
            <button onClick={togglePanel}>Cart</button>
            <div>{isCartOpen}</div>
            <CartPanel isCartOpen={isCartOpen} togglePanel={togglePanel}/>
        </section>
    )
}