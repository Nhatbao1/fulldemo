import { useState, useEffect } from "react";
const CountDown = (props) => {
    const { handleClickSubmit } = props;
    const [count, setCount] = useState(500);
    useEffect(() => {
        if (count === 0) {
            onTime();
            return;
        }
        // de lap vo han dung setInterval
        const timer = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        //setTimeout chi chay dc 1 lan
        // tham so 1 la ham`, tham so 2 la thoi gian sau bao lau thi thuc thi
        // neu khong xoa timer sau khi count thay doi se bi lap vo han sinh ra nhieu timer -> thoi gian bi lon xon
        return () => {
            clearInterval(timer);
        }
        // day la 1 hook cua useEffect la cleanUp
    }, [count]);
    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }
    const onTime = () => {
        handleClickSubmit();
    }
    return (
        <div className="coundown-container">
            {toHHMMSS(count)}
        </div>
    )
}
export default CountDown;