import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../loader/Loader';

function Weather() {

    const [handelInput, setHandelInput] = useState("");
    const [img, setImg] = useState("");
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true)

    let search = () => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${handelInput}&APPID=99aeb64dd4498f2b7d822956e60d1581`)
            .then((res) => {
                setInfo(res.data);
                setHandelInput('');
            })
            .catch((err) => {
                setError(true);
            })
    }

    setTimeout(() => {
        setLoading(false)
    }, 2000);

    useEffect(() => {
        if (info?.weather[0].main == "Clear") {
            setImg("clear.svg")
        } else if (info?.weather[0].main == "Thunderstorm") {
            setImg("Thunder.svg")
        } else if (info?.weather[0].main == "Drizzle") {
            setImg("drizzle.svg")
        } else if (info?.weather[0].main == "Rain") {
            setImg("rain.svg")
        } else if (info?.weather[0].main == "Snow") {
            setImg("snow.svg")
        } else if (info?.weather[0].main == "Clouds") {
            setImg("cloud.svg")
        } else {
            setImg("fog.svg")
        }
    }, [search])

    useEffect(() => {
        let city = "dhaka";
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=99aeb64dd4498f2b7d822956e60d1581`)
            .then(res => {
                setInfo(res.data);
            })
    }, [])



    return (
        <>
            {
                loading ?
                    <Loader />
                    :
                    <div className=' w-full h-screen flex flex-col justify-between'>
                        <h1 className='absolute top-2 text-white w-full bg-blue-600 font-pop text-[20px] pl-[10px] font-semibold'>Weather App</h1>
                        <div className='flex items-center flex-col font-pop'>
                            <div className='flex items-center justify-center gap-2 mt-[50px]'>

                                <div>
                                    <input type="text" onChange={(e) => {
                                        setHandelInput(e.target.value)
                                        setError(false);
                                    }} value={handelInput} placeholder='Search by city...'
                                        className='w-full max-w-[260px] border-[2px] border-solid outline-none border-black rounded px-[10px] py-[5px] font-pop font-bold indent-1 tracking-wide' />

                                    {
                                        error ?
                                            <p className='absolute ml-[10px] font-pop font-semibold text-red-600'>Invalid city name</p>
                                            :
                                            ""
                                    }
                                </div>

                                <div className='bg-blue-600 flex p-[3px] rounded'>
                                    <button onClick={search}
                                        className='w-full text-white px-1 py-1 font-pop font-semibold text-[17px]'>
                                        Search
                                    </button>
                                </div>

                            </div>

                            <div className='flex items-center justify-center flex-col mt-[100px]'>

                                <img src={img} className='w-full max-w-[150px]' />

                                <h1 className='text-[70px] font-bold p-0 text-red-500 pl-[20px]'>
                                    {
                                        Math.round((info?.main.temp - 273.15).toFixed(2))
                                    }
                                    <span className='relative top-[-10px]'>°</span>
                                </h1>
                                <p className='text-[20px] font-semibold mt-[-15px]  tracking-wide'>{info?.weather[0].main}</p>
                                <div className='flex items-center justify-center gap-1 '>
                                    <img src="location.svg" className='w-[18px]' />
                                    <h4 className='font-semibold'>{info?.name}, {info?.sys.country}</h4>
                                </div>
                            </div>
                        </div>

                        <div className='flex '>

                            <div className=' flex items-center border-2 w-full max-w-[50%] p-[8px]'>
                                <img src="life.svg" className='w-[60px]' />
                                <div>
                                    <p className='text-[20px] font-bold'>
                                        {
                                            Math.round((info?.main.feels_like - 273.15).toFixed(2))
                                        }
                                        <span className='relative top-[-3px]'>°</span>
                                    </p>
                                    <p className='text-[18px] font-semibold'>Feels Like</p>
                                </div>
                            </div>

                            <div className=' flex items-center border-2 w-full max-w-[50%] p-[15px]'>
                                <img src="water.svg" className='w-[60px]' />
                                <div>
                                    <p className='text-[20px] font-bold'>{info?.main.humidity}%</p>
                                    <p className='text-[18px] font-semibold'>Humidity</p>
                                </div>
                            </div>

                        </div>
                    </div>
            }


        </>
    )
}

export default Weather