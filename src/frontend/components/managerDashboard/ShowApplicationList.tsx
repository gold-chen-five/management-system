import { ApplicationListInterface } from "../../../frontend/interface/posts.interface"
import { v4 as uuidv4 } from 'uuid';
import ListItemList from "./ListItem";

const ShowApplicationList:React.FC<{
    applicationList: ApplicationListInterface[] | undefined,
    setItemInfo: React.Dispatch<React.SetStateAction<ApplicationListInterface | undefined>>,
    itemClick: boolean,
    setItemClick: React.Dispatch<React.SetStateAction<boolean>>
  }> = ({applicationList,setItemInfo,itemClick,setItemClick}) => {
    return(
      <div className='w-4/5 min-h-screen flex flex-col items-end space-y-4 pt-14 pr-24 sm:w-full sm:pr-0'>
        {
          applicationList?.map((item,i) => <ListItemList key={uuidv4()} item={item} setItemInfo={setItemInfo} itemClick={itemClick} setItemClick={setItemClick}/>)
        }
      </div>
    )
}
export default ShowApplicationList