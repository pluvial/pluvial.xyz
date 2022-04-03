---
title: Virtual Machines and Emulators
---

# Virtual Machines and Emulators

## VMs

[The virtualization API](https://libvirt.org/)

[KVM](https://www.linux-kvm.org/page/Main_Page)

[GitHub - linuxkit/linuxkit: A toolkit for building secure, portable and lean operating systems for containers](https://github.com/linuxkit/linuxkit)

[GitHub - moby/hyperkit: A toolkit for embedding hypervisor capabilities in your application](https://github.com/moby/hyperkit)

[BSD Hypervisor](https://bhyve.org/)

[bhyve - FreeBSD Wiki](https://wiki.freebsd.org/bhyve)

[GitHub - machyve/xhyve: xhyve, a lightweight OS X virtualization solution](https://github.com/machyve/xhyve)

[Apple Developer Documentation](https://developer.apple.com/documentation/hypervisor)

[Apple Developer Documentation](https://developer.apple.com/documentation/virtualization)

### QEMU

[QEMU](https://www.qemu.org/)

[QEMU](https://wiki.qemu.org/Main_Page)

[Welcome to QEMU's documentation! - QEMU documentation](https://qemu-project.gitlab.io/qemu/)

[docs · master · QEMU / QEMU](https://gitlab.com/qemu-project/qemu/-/tree/master/docs)

[QEMU Advent Calendar 2018](https://www.qemu-advent-calendar.org)

[foxlet/macOS-Simple-KVM](https://github.com/foxlet/macOS-Simple-KVM)

[UTM](https://mac.getutm.app/)

[GitHub - utmapp/UTM: Virtual machines for iOS](https://github.com/utmapp/UTM)

## DOS

[Software Library: MS-DOS Games](https://archive.org/details/softwarelibrary_msdos_games)

[DOSBox](https://www.dosbox.com/)

[DOSBox-X](https://dosbox-x.com/)

[joncampbell123/dosbox-x](https://github.com/joncampbell123/dosbox-x)

[dosbox-staging home](https://dosbox-staging.github.io/)

[https://github.com/dosbox-staging/dosbox-staging](https://github.com/dosbox-staging/dosbox-staging)

[VOGONS](https://www.vogons.org/)

## Windows

[WineHQ - Run Windows applications on Linux, BSD, Solaris and macOS](https://www.winehq.org/)

[CrossOver runs the Windows software you need on Mac, Linux and Chrome OS.](https://www.codeweavers.com/crossover)

[Home - PlayOnMac - Run your Windows applications on Mac easily!](https://www.playonmac.com/en/)

## Amiga

[FS-UAE Amiga Emulator](https://fs-uae.net/)

[AROS Research Operating System](https://aros.sourceforge.io/)

[aros-development-team/AROS](https://github.com/aros-development-team/AROS)

## Nintendo

[https://switchbrew.org/wiki/Main_Page](https://switchbrew.org/wiki/Main_Page)

[GitHub - switchbrew/libnx: Library for Switch Homebrew](https://github.com/switchbrew/libnx)

[GitHub - switchbrew/switch-examples: Switch examples for devkitA64 and libnx.](https://github.com/switchbrew/switch-examples)

[Ryujinx - Nintendo Switch Emulator](https://ryujinx.org/)

[https://github.com/Ryujinx/Ryujinx](https://github.com/Ryujinx/Ryujinx)

[yuzu · yuzu](https://yuzu-emu.org/)

[GitHub - yuzu-emu/yuzu: Nintendo Switch Emulator](https://github.com/yuzu-emu/yuzu)

[GitHub - Atmosphere-NX/Atmosphere: Atmosphère is a work-in-progress customized firmware for the Nintendo Switch.](https://github.com/Atmosphere-NX/Atmosphere)

[GitHub - skyline-emu/skyline: Run Nintendo Switch homebrew & games on your Android device!](https://github.com/skyline-emu/skyline)

[ScummVM](https://www.scummvm.org/)

[xenia - Xbox 360 Research Emulator](https://xenia.jp/)

[xenia-project/xenia](https://github.com/xenia-project/xenia)

## Development

[Emulator 101](http://emulator101.com/)

[MAMEDEV.org | Home of The MAME Project](https://www.mamedev.org/)

[NesDev.com](http://nesdev.com/)

[Nesdev wiki](http://wiki.nesdev.com/w/index.php/Nesdev_Wiki)

[fogleman/nes](https://github.com/fogleman/nes)

[def-/nimes](https://github.com/def-/nimes)

[HomePage](https://wiki.superfamicom.org/)

### Ubuntu Core on QEMU on Mac

- Seguir os primeiros passos do tutorial, até à parte do KVM [https://ubuntu.com/download/kvm](https://ubuntu.com/download/kvm)
- Sacar e descomprimir este RPM, lá dentro tem o firmware UEFI que é preciso para arrancar (o OVMF, que é mencionado no tutorial): [https://www.kraxel.org/repos/jenkins/edk2/edk2.git-ovmf-x64-0-20210804.30.g6fdd1c13a7.noarch.rpm](https://www.kraxel.org/repos/jenkins/edk2/edk2.git-ovmf-x64-0-20210804.30.g6fdd1c13a7.noarch.rpm)
- Converter a imagem do Ubuntu core para qcow2: `qemu-img convert ubuntu-core-20-amd64.img -O qcow2 ubuntu-core-20-amd64.qcow2`
- Lançar o QEMU com:

```
qemu-system-x86_64 \
  -smp 2 \
  -m 2G \
  -cpu host \
  -machine type=q35,accel=hvf \
  -net nic,model=virtio \
  -net user,hostfwd=tcp::8022-:22,hostfwd=tcp::8090-:80 \
  -vga virtio \
  -drive file=ubuntu-core-20-amd64.qcow2,cache=none,format=qcow2,id=disk1,if=none \
  -device virtio-blk-pci,drive=disk1,bootindex=1 \
  -drive file=/location/of/extracted/rpm/usr/share/edk2.git/ovmf-x64/OVMF_CODE-pure-efi.fd,if=pflash,format=raw,unit=0,readonly=on
```

[Installing Ubuntu Core 20 | Ubuntu](https://ubuntu.com/core/docs/uc20/install)

[Virtualization - qemu | Ubuntu](https://ubuntu.com/server/docs/virtualization-qemu)
