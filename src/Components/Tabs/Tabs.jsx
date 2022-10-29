import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientsTypes } from "../../shared/const/ingredientTypes";

export function Tabs() {
    const [current, setCurrent] = useState('one');
    return (
        <div className="pb-10" style={{ display: 'flex' }}>
            {ingredientsTypes.map((item) => <Tab
                key={item.value}
                value={item.value}
                active={current === item.value}
                onClick={setCurrent}
            >
                {item.value}
            </Tab>)}
        </div>
    )
}