import { mp, vp } from "@/app/components/cssStyles";

export default function Verify(){
    return(
        <div className={mp}>
            <div className={`${vp} bg-white p-5`}>
                <h1>
                    Check Your Inbox For The Verification Link We Sent You!
                </h1>
                <p>If you can't find us in your primary mail box check spam!</p>
            </div>
        </div>
    )
}