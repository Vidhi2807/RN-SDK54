import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout(){
  return (
    <Drawer>
      <Drawer.screen name = "(tabs)" />
      <Drawer.screen name = "setting" options={{
         title: "Settingscreen",
         drawerLabel: "vidhi_vidhu",
          }} />
    </Drawer>
    )
}