import { useState } from 'react';
import PaperMetaInfo from './meta-info';
import PaperAddQuestion from './paper-add-question';


const  PaperAdd = () => {

  const [hasClickButton, setHasClickButton ] = useState(false);
  const [metaInfo, setMetaInfo] = useState();
  console.log('hasclickbutton',hasClickButton)
  console.log('metainfo',metaInfo);


  return (
    <div className='form-wrapper'>
   {   hasClickButton 
      ? 
      <PaperAddQuestion metaInfo={metaInfo} setMetaInfo={setMetaInfo}></PaperAddQuestion>
      :
      <PaperMetaInfo hasClickButton={hasClickButton} setHasClickButton={setHasClickButton} metaInfo={metaInfo} setMetaInfo={setMetaInfo} />
}

    </div>
    );
}
export default PaperAdd;