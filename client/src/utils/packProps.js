function packProps(packed) {
    console.log(packed)
    if (!Object.keys(packed)) throw new Error("packProps: packed is required")
    return Array.from(Object.keys(packed)).reduce((acc, key) => {
        const value = packed[key]
        if (typeof value === "object") {
            for (const k in value) {
                acc.push({ key: key, value: String(value[k]) })
            }
        }
        else acc.push({ key, value: String(value) })

        return acc
    }, []);
}

export default packProps;