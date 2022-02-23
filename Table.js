
export default function Table({ csvArray, csvHeaders, tag }) {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {
                                        csvHeaders.map((item, index) => (
                                            <th key={index}
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {item}
                                            </th>

                                        ))
                                    }
                                </tr>
                            </thead>
                            {
                                tag === 'distance' &&
                                csvArray.map((info, index) => (
                                    <tr key={index} >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info.service_hub_code}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info.driver_admin_id}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info.driver_name}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info.ordernumber}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info['Sum of actf_restaurant_customer_max']}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info['Sum of road_restaurant_customer_max']}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info['>7.5km deliveries']}</div>
                                        </td>
                                    </tr>))
                            }

                            {
                                //hub_code,Driver Admin ID,driver_name,1/28/2022,1/29/2022,1/30/2022,Grand Total,Fri Driver Premium,Sat + Sun Driver Premium,Total Driver Premium
                                tag === 'premium' && csvArray.map((info, index) => (
                                    <tr key={index} >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info.hub_code}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info['Driver Admin ID']}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info.driver_name}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info['1/28/2022']}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info['1/29/2022']}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info['Grand Total']}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info['Fri Driver Premium']}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info['Sat + Sun Driver Premium']}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{info['Total Driver Premium']}</div>
                                        </td>
                                    </tr>))
                            }


                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
