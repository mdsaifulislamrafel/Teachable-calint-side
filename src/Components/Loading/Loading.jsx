

import { grid } from 'ldrs'
grid.register()

const Loading = () => {
    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <l-grid
                size="60"
                speed="1.5"
                color="black"
            ></l-grid>
        </div>
    );
};

export default Loading;