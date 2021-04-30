import './navForm.css';
// import data from './startups.csv'
import React, { useState } from "react"
import { Button } from 'reactstrap';
// import './startups.css'
import { BrowserRouter as Router, Link } from "react-router-dom"
import { useEffect } from 'react'
import {ExportCSV} from './ExportCSV';

const fileName = 'Startups';

// continue 
const Table = ({
   startups = [],
   loading = false,
   fetchAllStartups = f => f,
   filtreStartups = f=> f
}) => {
   useEffect(() => {
      fetchAllStartups()
   }, fetchAllStartups)

   const [filtre, setFiltre] = useState({
      source: 0,
      travail: '',
      technologie: '',
      contrat: ''
   })
   function handleChangeSource(e) {
      e.preventDefault()
      setFiltre(
         {
            ...filtre,
            source: e.target.value
         }
      )
   }
   function handleChangeTech(e) {
      e.preventDefault()
      setFiltre(
         {
            ...filtre,
            technologie: e.target.value
         }
      )
   }
   function handleChangeContrat(e) {
      e.preventDefault()
      setFiltre(
         {
            ...filtre,
            contrat: e.target.value
         }
      )
   }
   function handleChangeCheck(e) {
      e.preventDefault()
      setFiltre(
         {
            ...filtre,
            travail: e.target.value ? 'Remote' : ''
         }
      )

   }

   const renderTableHeader = () => {
      if (startups.length) {
         let header = Object.keys(startups[0])
         return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
         })
      }

   }
   const data = () => {
      return startups.map((Startup) => {
         const { name, website } = Startup
         return ( {name,website })})
   }

   const renderTableData = () => {
      return startups.map((Startup, index) => {
         const { name, website } = Startup
         return (
            <tr>
               <td >
                  {/* <Link to={{ pathname:'/offre/'+ name,state:{fromStartups:true, filtre:filtre} }}> {name} </Link> */}
                  <Link > {name} </Link>

               </td>

               <td id="web">
                   <a href={website}>{website} </a>
               </td>

            </tr>

         )

      })
   }
   return <div >
      <nav className="box">

         <div className="element sourcedropdown" >
            <label>Source :</label>
            <select className="form-control" name="Source" onChange={e => handleChangeSource(e)} >
               <option selected>Select Source</option>
               {/* <option value={1}>Welcome To The Jungle</option> */}
               <option value={1}>Wlcm</option>
               <option value={2}>Indeed</option>
               <option value={3}>Angellist</option>
            </select>

         </div>

         <div className="element Techdropdown">
            <label>Technology :</label>
            <select className="form-control" name="Tech" onChange={e => handleChangeTech(e)}>
               <option selected>Select Technology</option>
               <option className="dropdown-item" value="react">React</option>
               <option className="dropdown-item" value="node">Node</option>
               <option className="dropdown-item" value="angular">Angular</option>
            </select>
         </div>


         <div id="contrat" className="element contrat">
            <label>Contract :</label>
            <select className="form-control" name="Contract" onChange={e => handleChangeContrat(e)}>
               <option selected>Select contract</option>
               <option className="dropdown-item" value="CDD">CDD</option>
               <option className="dropdown-item" value="CDI">CDI</option>
               <option className="dropdown-item" value="Stage">Stage</option>
               <option className="dropdown-item" value="Alternance">Alternance</option>
               <option className="dropdown-item" value="Apprentissage">Apprentissage</option>

e.preventDefault()
</select>
         </div>
         <div id="checkbox" className="element checkbox">
            <label check>
               <input type="checkbox" name="Remote" onChange={e => handleChangeCheck(e)} />{' '}
Remote
</label>
         </div>
         <Button id="button" onClick={e => {
            console.log(filtre)
            filtreStartups(filtre)
         }}>Submit</Button>

      </nav>
      {loading ?
         'loading...'
         :
         <>
            <p></p>
            <ExportCSV csvData={data()} fileName={fileName} />
            { <h1 id='title'>Start-ups List Table : {startups.length} - startup</h1>}
            <table id='offers'>
               <tbody>

                  <tr>{renderTableHeader()}</tr>

                  {renderTableData()}

               </tbody>
            </table>
         </ >
      }
   </div>
}


export default Table 