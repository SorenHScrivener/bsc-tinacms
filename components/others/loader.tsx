import React from 'react'

import Tree from './tree'

export default function Loader() {
  return (
      <div>
          <div className="bg-black w-screen h-screen z-0 flex justify-center items-center">
              <div className="
                        flex 
                        flex-col
                        justify-center
                        items-center
                        absolute
                        top-[50%]
                        left-[50%]
                        translate-x-[-50%]
                        translate-y-[-50%]
                    ">
                  <Tree />
                  <p className="rainbow text-5xl tracking-wider font-semibold font-mainTitle relative bottom-14 text-white">
                      Loading...
                  </p>
              </div>
          </div>
      </div>
  )
}
