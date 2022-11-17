import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useAlert } from 'react-alert'


const App = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [windowLoading, setWindowLoading] = useState(true);
    const [fontsloaded, setFontsloaded] = useState(false);
    const [step, setStep] = useState(1);
    const video1 = useRef();
    const video2 = useRef();
    const alert = useAlert()

    const handleOpenSite = () => {
        if (fontsloaded) {
            setWindowLoading(false);
            video1.current.style.zIndex = 1;
            video1.current.play();
        }
    }

    const handleVideo1Ended = () => {
        video1.current.style.zIndex = -1;
    }

    const handleVideo2Ended = () => {
        setStep(2);
        video2.current.style.zIndex = -1;
    }

    const handleValidateName = async () => {
        try {
            if (name.length > 0 && !loading) {
                setLoading(true);
                const req = await axios.get(`https://atamoascension.xyz/api/asahitrials/${name}`);
                const res = await req.data;
                if (res.success) {
                    video2.current.style.zIndex = 2;
                    video2.current.play();
                    setLoading(false);
                } else {
                    alert.error('wrong name')
                    setLoading(false)
                }
            }
        } catch (err) {
            alert.error('something went wrong')
            setLoading(false)
        }
    };

    const handleTweet = async () => {
        try {
            if (address.length > 1) {
                setLoading(true);
                const req = await axios.get(`https://atamoascension.xyz/api/asahitrials/address/${address}`);
                const res = await req.data;
                if (res.success) {
                    const tweetContent = `I've solved the second @AtamoAscension Trial and ascended%0A%0ACome ascend with me%0A%0A`;
                    const link = `https://twitter.com/intent/tweet?text=${tweetContent}&url=https://enter.asahitrials.xyz`;
                    window.open(link, "_blank");
                } else {
                    alert.error(res.msg)
                }
                setLoading(false);
            }
        } catch (err) {
            alert.error('something went wrong')
            setLoading(false)
        }
    }


    useEffect(() => {
        window.addEventListener("load", () => setFontsloaded(true));
    }, []);




    return (
        <div className='root'>
            <video className='video1' onEnded={handleVideo1Ended} ref={video1} preload='true' src='/Help_Me.mp4'></video>
            <video className='video2' onEnded={handleVideo2Ended} ref={video2} preload='true' src='/Thank_you_for_saving_me.mp4'></video>
            {
                step === 1
                && <div className='form-wrap'>
                    <h1>Enter the name of the sister</h1>
                    <div className='input-wrap'>
                        <input value={name} onInput={e => setName(e.target.value)} />
                        <button onClick={handleValidateName}>
                            {
                                loading
                                    ? <div className="spinner-border text-white" role="status">
                                    </div>
                                    :
                                    "continue"
                            }
                        </button>
                    </div>
                </div>
            }
            {
                step === 2
                && <div className='form-wrap'>
                    <h1>You have been atamolisted!</h1>
                    <h2>Enter your wallet address to continue</h2>
                    <div className='input-wrap'>
                        <input placeholder='0x...' value={address} onInput={e => setAddress(e.target.value)} />
                        <button onClick={handleTweet}>
                            {
                                loading
                                    ? <div className="spinner-border text-white" role="status">
                                    </div>
                                    :
                                    "confirm"
                            }
                        </button>
                    </div>
                </div>
            }
            {
                windowLoading
                && <div className='preload'>
                    {
                        fontsloaded
                            ? <h1 onClick={handleOpenSite}>click to start</h1>
                            : <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    aria-label="Animated striped example"
                                    aria-valuenow="100"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{ width: "100%" }}></div>
                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default App