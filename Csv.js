import { useState, useRef } from 'react'
import styles from './Csv.module.css'
import Table from './Table'
import axios from '../../services/axios-token'

export default function Csv() {
    const ref = useRef()
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [csvHeaders, setCsvHeaders] = useState([])
    const [tag, setTag] = useState('distance')
    const [profile, setProfile] = useState("Distance Exception")
    const [error, setError] = useState("")
    const [startRow, setStartRow] = useState(0)
    const [headerInRow, setHeaderInRow] = useState(0)
    const changeTag = (value, tag) => {
        setCsvHeaders([])
        setProfile(value)
        setTag(tag)
        setCsvArray([])
        ref.current.value=""
    }

    const submit = () => {
        const file = csvFile;
        let data = new FormData()
        data.append('file', file)
        data.append('profile',tag)
        data.append('startRow',startRow)
        data.append('headerInRow',headerInRow)
        axios.post('/admin/file/preview', data).then((res) => {
            setCsvHeaders(Object.keys(res.data.data[0]))
            setCsvArray(res.data.data)
        }).catch((err) => {
            console.log('TEst err', err.response)
        })
    }

    return (
        <>
            <div className={`${styles.maincontainer}`}>
                <div className={`${styles.box}`}>
                    <div className={`${styles.inputcontainer}`}>
                        <label className={`${styles.label}`}>Client</label>
                        <select className={`${styles.dropdown}`} name="client">
                            <option value="">Select...</option>
                        </select>
                    </div>
                    <div className={`${styles.multielements}`}>
                        <div className={`${styles.inputcontainer}`}>
                            <label className={`${styles.label}`}>Import Profile's</label>
                        </div>

                        <div className={`${styles.checkbox}`}>
                            <input className={`${styles.check}`} type='checkbox' />
                            <label className={`${styles.label}`}>Show Disabled</label>
                        </div>
                    </div>

                    <div className={`${styles.profileBox}`}>
                        <p className={`${tag === 'distance' ? styles.selected : ''}`} onClick={() => changeTag('Distance Exception', 'distance')}>Distance Exception</p>
                        <p className={`${tag === 'daily' ? styles.selected : ''}`} onClick={() => changeTag('Daily Fees', 'daily')}>Daily Fees</p>
                        <p className={`${tag === 'premium' ? styles.selected : ''}`} onClick={() => changeTag('Premium Orders', 'premium')}>Premium Orders</p>
                    </div>

                </div>
                <div className={`${styles.box}`}>
                    <div className={`${styles.inputcontainer}`}>
                        <label className={`${styles.label}`}>Import Profile Description</label>
                        <input value={profile} className={`${styles.longtext}`} type='text' />
                    </div>
                    <div className={`${styles.multielements}`}>
                        <div className={`${styles.inputcontainer}`}>
                            <label className={`${styles.label}`}>Start Import at Row</label>
                        </div>
                        <div className={`${styles.inputcontainer}`}>
                            <input value={startRow} onChange={(e)=>setStartRow(e.target.value)} className={`${styles.shortcode}`} type='text' />
                        </div>
                    </div>

                    <div className={`${styles.multielements}`}>
                        <div className={`${styles.inputcontainer}`}>
                            <label className={`${styles.label}`}>Headers in Row</label>
                        </div>
                        <div className={`${styles.inputcontainer}`}>
                            <input value={headerInRow} onChange={(e)=>setHeaderInRow(e.target.value)}  className={`${styles.shortcode}`} type='text' />
                        </div>
                    </div>

                    <div className={`${styles.checkbox}`}>
                        <input className={`${styles.check}`} type='checkbox' />
                        <label className={`${styles.label}`}>Data has headers</label>
                    </div>

                    <div className={`${styles.checkbox}`}>
                        <input className={`${styles.check}`} type='checkbox' />
                        <label className={`${styles.label}`}>Ignore Last Row</label>
                    </div>
                    <div className={`${styles.multielements}`}>
                        <div className={`${styles.checkbox}`}>
                            <input className={`${styles.check}`} type='checkbox' />
                            <label className={`${styles.label}`}>Delimite</label>
                        </div>

                        <div className={`${styles.checkbox}`}>
                            <input className={`${styles.check}`} type='checkbox' />
                            <label className={`${styles.label}`}>Fixed With</label>
                        </div>
                    </div>

                    <div className={`${styles.checkbox}`}>
                        <input className={`${styles.check}`} type='checkbox' />
                        <label className={`${styles.label}`}>Tab</label>
                    </div>

                    <div className={`${styles.checkbox}`}>
                        <input className={`${styles.check}`} type='checkbox' />
                        <label className={`${styles.label}`}>Semicolon</label>
                    </div>

                    <div className={`${styles.checkbox}`}>
                        <input className={`${styles.check}`} type='checkbox' />
                        <label className={`${styles.label}`}>Space</label>
                    </div>

                    <div className={`${styles.checkbox}`}>
                        <input className={`${styles.check}`} type='checkbox' />
                        <label className={`${styles.label}`}>Other</label>
                    </div>
                    <div className={`${styles.inputcontainer}`}>
                        <form id='csv-form'>
                            <input ref={ref}
                                type='file'
                                accept='.csv'
                                id='csvFile'
                                onChange={(e) => {
                                    setCsvFile(e.target.files[0])
                                }}
                            >
                            </input>
                            <p className={`${styles.error}`}>{error}</p>
                            <br />
                            <button className={`${styles.button}`} onClick={(e) => {
                                e.preventDefault()
                                if (csvFile) submit()
                            }}>
                                Load CSV
                            </button>
                        </form>

                    </div>

                    {/* <button onClick={() => showContents()}>TEST</button> */}

                </div>

                <div className={`${styles.box}`}>

                </div>
            </div>
            {
                csvHeaders.length > 0 && <Table tag={tag} csvHeaders={csvHeaders} csvArray={csvArray} />
            }
        </>
    );

}