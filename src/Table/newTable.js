import React, {useState} from "react";
import Table from "./Table"
import {manufacturingOperationReport,standartStance,newObj} from "./newTabledata"

import classes from "./newtable.module.css"
import newTable from "./newTable";
const NewTable =()=> {
    const table1=["Tablo 1) Mevcut Kayıt verileri","Üretim Operasyon Bildirimleri"]
    const callManufactuing = ["Kayıt No","Başlangıç","Bitiş","Toplam Süre(Saat)","statü","Duruş Nedeni"];
    const table2 =["Tablo 2) Mevcut Kayıtlı standart duruş bilgileri","standart duruşlar"]
    const callStandart = ["Başlangıç","Bitiş","Duruş Nedeni"];
    const table3=["Tablo 3) Mevcut Kayıt verileri"];

    const [isClick,setIsClick] =useState(false);

    const isClickHandler = ()=>{
        const value = !isClick;
        setIsClick(value)
    }
    return (
        <div className={classes.body}>
            <div className={classes.table}>
                <Table calNames={callManufactuing} calTablo={table1} callList={manufacturingOperationReport}/>
                <Table calNames={callStandart} calTablo={table2} callList={standartStance}/>
            </div>
            <button onClick={()=>isClickHandler()} className={classes.button}> Tıklayınız.</button>
            { isClick && <Table calNames={callManufactuing} calTablo={table3} callList={newObj}/>}

        </div>
    );
}

export default NewTable;