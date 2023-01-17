import {useCallback} from 'react'
import M from 'materialize-css'

export const useMessage = () => {
  return useCallback(text => {
    if ( text) {
      M.toast({ html: text })
    }
  }, [])
}