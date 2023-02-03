import React from "react";
import classes from "./table.module.css"
const Table = (props) => {
   return <React.Fragment>
      {props.calNames.length >0 &&
      <table className={classes.operation}>
         <thead>
         <tr>
            <th className={classes.oneHead} colSpan={props.calNames.length} scope="colgroup">
               {props.calTablo[0].toUpperCase()}
            </th>
         </tr>
         {props.calTablo[1] !== undefined  &&
             <tr>
                <th colSpan={props.calNames.length} scope="colgroup">
                   {props.calTablo[1]}
                </th>
             </tr>}
         <tr>{
            props.calNames.map((header,index)=>{
               return <th key={index}>
                  {header.toUpperCase()}
               </th>
            })
         }</tr>
         </thead>
         <tbody>
         {Object.values(props.callList).map((obj,index)=>
            <tr key={index}>
               {Object.values(obj).map((value,index2)=>
                  <td className={classes.figures} key={index2} >
                     {value}
                  </td>
               )}
            </tr>
         )}
         </tbody>
      </table>
      }
   </React.Fragment>
}
export default Table;