import React from 'react'
import './Loading.scss';

class Loading extends React.Component {

  render() {
    return (<section className='ctnr'>
      <div className='ldr'>
        <div className='ldr-blk'></div>
        <div className='ldr-blk an_delay'></div>
        <div className='ldr-blk an_delay'></div>
        <div className='ldr-blk'></div>
      </div>
    </section>);
  }

}

export default Loading
