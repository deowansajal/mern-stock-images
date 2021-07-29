const timeFormatter = isoDate => {
    return new Date(isoDate).toLocaleString()
    // let date, year, month, dt
    // date = new Date(isoDate)
    // year = date.getFullYear()
    // month = date.getMonth() + 1
    // dt = date.getDate()

    // if (dt < 10) {
    //     dt = '0' + dt
    // }
    // if (month < 10) {
    //     month = '0' + month
    // }
    // return `${dt}/${month}/${year}`
}

export default timeFormatter
