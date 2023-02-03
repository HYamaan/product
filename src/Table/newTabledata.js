export const manufacturingOperationReport = [
    {
        registrationNo: 1,
        start: "23.05.2020 07:30",
        finish: "23.05.2020 08:30",
        TotalTime: "01:00",
        statue: "production",
        causeOfPosture: "",
    },
    {
        registrationNo: 2,
        start: "23.05.2020 08:30",
        finish: "23.05.2020 12:00",
        TotalTime: "03:30",
        statue: "production",
        causeOfPosture: "",
    },
    {
        registrationNo: 3,
        start: "23.05.2020 12:00",
        finish: "23.05.2020 13:00",
        TotalTime: "01:00",
        statue: "production",
        causeOfPosture: "",
    },
    {
        registrationNo: 4,
        start: "23.05.2020 13:00",
        finish: "23.05.2020 13:45",
        TotalTime: "00:45",
        statue: "wait",
        causeOfPosture: "failure",
    },
    {
        registrationNo: 5,
        start: "23.05.2020 13:45",
        finish: "23.05.2020 17:30",
        TotalTime: "03:45",
        statue: "production",
        causeOfPosture: "",
    },
];

export const standartStance = [
    {
        start: "10:00",
        finish: "10:15",
        causeOfPosture: "teaBreak",
    },

    {
        start: "12:00",
        finish: "12:30",
        causeOfPosture: "mealBreak",
    },
    {
        start: "15:00",
        finish: "15:15",
        causeOfPosture: "teaBreak",
    },
];



///[SORT]
standartStance.sort(function (a, b) {
    return a.start.localeCompare(b.start);
});
manufacturingOperationReport.sort(function (a, b) {
    return a.start.localeCompare(b.start);
});

///ARRAY[]
const standartObj = Object.entries(standartStance);
const manufacturingObj = Object.entries(manufacturingOperationReport);

/// DATE
const calcDate = (item) => {
    const str = item;
    const [dateValues, timeValues] = str.split(" ");
    const [day, month, year] = dateValues.split(".");
    const [hours, minutes] = timeValues.split(":");
    const date = new Date(+year, +month - 1, +day, +hours, +minutes);
    return date;
};
// DATE LOCALSTRING
const dateLocal = (item) => {
    const localString = item.toLocaleString("tr-TR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    return localString;
};


/// Number to HH:ii
const formatHours = (item1, item2) => {
    let num,
        hours,
        minutes,
        subTotal = 0;
    subTotal = Math.abs(item1 - item2);
    num = subTotal / (1000 * 60);

    hours = Math.floor(num / 60);
    minutes = num % 60;

    return (
        String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0")
    );
};

// THIRD ARRAY AND isVALID
export const newObj = [];
let isValid = false;

manufacturingObj.map((manufacturing, manuIndex, manuArr) => {

    const outputStartClock = calcDate(manufacturing[1].start); // [CLOCK]
    const outputEndClock = calcDate(manufacturing[1].finish); // [CLOCK]

    const stopManufact = manufacturing[1].causeOfPosture;

    standartObj.map((standart, stIndex, stArr) => {
        const standartStartClock = calcDate(`23.05.2020 ${standart[1].start}`); // [CLOCK]
        const standartEndClock = calcDate(`23.05.2020 ${standart[1].finish}`); // [CLOCK]
        const newStartDate = dateLocal(standartStartClock); // [DATE]
        const newFinishDate = dateLocal(standartEndClock); // [DATE]
        if (
            outputStartClock <= standartStartClock &&
            standartEndClock <= outputEndClock
        ) {
            isValid = true;

            const totalTimeStart = standartStartClock.getTime() === outputStartClock.getTime() ? "" : formatHours(standartStartClock, outputStartClock); // START TIME
            const totalTimeStop = standartStartClock.getTime() === standartEndClock.getTime() ? "" : formatHours(standartStartClock, standartEndClock); // WAITING TIME
            const totalTimeFinish = standartEndClock.getTime()===outputEndClock.getTime() ? "" : formatHours(standartEndClock, outputEndClock); // FINISH TIME


            const product1 = { ...manufacturing[1], TotalTime: totalTimeStart,finish:newStartDate};  //START OBJECT
            const product2 = { ...manufacturing[1], TotalTime: totalTimeStop,"causeOfPosture":standart[1].causeOfPosture,start:newStartDate,finish:newFinishDate ,statue:"waiting" };  //WAITING OBJECT
            const product3 = { ...manufacturing[1], TotalTime: totalTimeFinish,start:newFinishDate}; // FINISH OJECT

            const obj1 = JSON.parse(JSON.stringify(product1));
            const obj2 = JSON.parse(JSON.stringify(product2));
            const obj3 = JSON.parse(JSON.stringify(product3));


            if(totalTimeStart !== ""){
                newObj.push(obj1);

            }
            if(totalTimeStop !== ""){
                newObj.push(obj2);
            }
            if(totalTimeFinish !== ""){
                newObj.push(obj3)
            }

        }
    });
    if (stopManufact !== "") {
        isValid =true;
        newObj.push(manufacturing[1]);
    }

    if(isValid === false){
        newObj.push(manufacturing[1]); // if the stop or the product has not stopped, it will work
    }
});


console.table(newObj);


