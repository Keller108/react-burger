import { useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export function Tabs({ types }) {
    const [current, setCurrent] = useState(null);

    useEffect(() => {
      setCurrent(types[0])
    }, [types])

    return (
        <div className="pb-10" style={{ display: 'flex' }}>
            {types.map((type) => <Tab
                key={type}
                value={type}
                active={current === type}
                onClick={setCurrent}
            >
                {type === 'bun'
                    ? "Булки" : type === 'main'
                        ? 'Начинка' : type === "sauce"
                            ? "Соусы" : null
                }
            </Tab>)}
        </div>
    )
}