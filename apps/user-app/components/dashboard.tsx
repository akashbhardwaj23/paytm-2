

export default function({amount, locked}: {amount : number, locked : number}){

    return <div className="p-4 w-[65%] h-[70%] rounded-2xl shadow-md">
        <div className="p-2 text-gray-700/80 font-semibold">
            PortFolio Value
            <div className="text-gray-900 text-4xl">
                $ {amount /100}
            </div>
        </div>

        <div className="flex flex-col justify-center h-1/2">
            <div className="mb-2 text-gray-700/80 font-semibold">$0.0</div>
            <hr className="border-t-blue-700 border-t-2" />
            <div className="mt-2 font-semibold text-gray-700/80 flex justify-end">INR {amount / 100}</div>
        </div>
    </div>
}