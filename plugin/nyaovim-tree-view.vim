if get(g:, 'loaded_nyaovim_tree_view', 0) || !exists('g:nyaovim_version')
    finish
endif

command! -nargs=1 -complete=dir TreeViewDir call rpcnotify(0, 'nyaovim-tree-view:open-dir', <q-args>)

let g:loaded_nyaovim_tree_view = 1
