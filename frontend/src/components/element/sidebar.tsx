import { motion } from 'framer-motion';
import { ArrowUpDown, Bot, ChevronsUpDown, Image, LogIn, LogOut, PanelRightClose, PanelRightOpen, Plus, Settings, Settings2, SquareUser } from 'lucide-react';
import { Button } from '../ui/button';
import { CringeLogo } from '@/assets/cringelogo';
import { useSidebar } from '@/features/sidebar/components/sidebar-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import avatar from "@/assets/avatar.png"
import { useAuth } from '@/features/authentication/hooks/use-auth';
import { Input } from '../ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { ThemeSettings } from '@/features/settings/components/theme-settings';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User, Palette } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BrainCircuit, Zap, Shield, Bell, Eye, MessageSquare } from 'lucide-react'


interface SidebarProps {
  conversationList?: React.ReactNode;
  actions?: React.ReactNode;
}

const Sidebar = ({ conversationList, actions }: SidebarProps) => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { user, isLoading } = useAuth();
  const animationDuration = 0.2;
  const [selectedSetting, setSelectedSetting] = useState('general');
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<string | null>(null)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleOpenModal = (modal: string) => {
    setOpenModal(modal)
  }

  const handleCloseModal = () => {
    setOpenModal(null)
  }

  return (
      <motion.div
        className="left-0 z-10 fixed inset-y-0 sidebar-container"
        initial={false} // Prevent initial animation
        animate={{
          width: isCollapsed ? '55px' : '250px'
        }}
        transition={{
          duration: animationDuration,
          ease: "easeInOut"
        }}
        style={{
          width: isCollapsed ? '55px' : '250px', // Force immediate width
        }}
      >
      <div className="flex flex-col border-alpha-200 bg-secondary border-r h-svh overflow-hidden">
        {/* Top Section */}
        <div className="relative flex items-center mt-2 p-2 pb-1">
          <div className={`flex items-center gap-2.5 ${!isCollapsed ? 'justify-start w-[80%]' : 'justify-center w-full'}`}>
            <Button variant="default" className="relative w-full h-9">
              <div className="left-2 absolute flex items-center">
                <CringeLogo className="shrink-0 size-6 stroke-primary-foreground" />
                <motion.div
                  className="flex items-center ml-2 text-xs whitespace-nowrap overflow-hidden"
                  animate={{
                    width: isCollapsed ? 0 : 'auto',
                    opacity: isCollapsed ? 0 : 1,
                  }}
                  transition={{
                    duration: animationDuration,
                    ease: "easeInOut"
                  }}
                >
                  CringeAI
                  <span className='ml-1 font-light text-xs'>beta</span>
                </motion.div>
              </div>
            </Button>
          </div>
          <div className="flex-1"></div>
          {!isCollapsed && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <PanelRightOpen className='size-4' />
            </Button>
          )}
        </div>

        {/* Main Content Area - Flex Column with Full Height */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* Action Buttons */}
          <div className="p-2">
            {/* New Chat Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative flex justify-start gap-2.5 w-full h-9 font-normal text-sm group"
              onClick={() => { navigate('/') }}
            >
              <div className="left-3 absolute flex items-center">
                <Plus className="shrink-0 size-4" />
                <motion.span
                  className="ml-2 text-sm whitespace-nowrap overflow-hidden"
                  animate={{
                    width: isCollapsed ? 0 : 'auto',
                    opacity: isCollapsed ? 0 : 1,
                  }}
                  transition={{
                    duration: animationDuration,
                    ease: "easeInOut"
                  }}
                >
                  New Chat
                </motion.span>
              </div>
            </Button>

            {/* Explore Agents Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative flex justify-start gap-2.5 w-full h-9 font-normal text-sm group"
              onClick={() => { navigate('/models') }}
            >
              <div className="left-3 absolute flex items-center">
                <Bot className="size-4" />
                <motion.span
                  className="ml-2 text-sm whitespace-nowrap overflow-hidden"
                  animate={{
                    width: isCollapsed ? 0 : 'auto',
                    opacity: isCollapsed ? 0 : 1,
                  }}
                  transition={{
                    duration: animationDuration,
                    ease: "easeInOut"
                  }}
                >
                  Fine-Tune Agents
                </motion.span>
              </div>
            </Button>

            {/* Download Models Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative flex justify-start gap-2.5 w-full h-9 font-normal text-sm group"
              onClick={() => { navigate('/cloud') }}
            >
              <div className="left-3 absolute flex items-center">
                <ArrowUpDown className="size-4" />
                <motion.span
                  className="ml-2 text-sm whitespace-nowrap overflow-hidden"
                  animate={{
                    width: isCollapsed ? 0 : 'auto',
                    opacity: isCollapsed ? 0 : 1,
                  }}
                  transition={{
                    duration: animationDuration,
                    ease: "easeInOut"
                  }}
                >
                  Download Models
                </motion.span>
              </div>
            </Button>

            {/* Download Models Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative flex justify-start gap-2.5 w-full h-9 font-normal text-sm group"
              onClick={() => { navigate('/diffusion') }}
            >
              <div className="left-3 absolute flex items-center">
                <Image className="size-4" />
                <motion.span
                  className="ml-2 text-sm whitespace-nowrap overflow-hidden"
                  animate={{
                    width: isCollapsed ? 0 : 'auto',
                    opacity: isCollapsed ? 0 : 1,
                  }}
                  transition={{
                    duration: animationDuration,
                    ease: "easeInOut"
                  }}
                >
                  Image Generation
                </motion.span>
              </div>
            </Button>

            {/* Search Bar */}
            <div className={`flex items-center px-3 gap-2.5 w-full ${!isCollapsed ? 'opacity-100' : 'hidden'}`}>
              <MagnifyingGlassIcon className="size-4 stroke-muted-foreground" />
              <Input
                className="border-0 focus-within:border-0 focus:border-0 bg-transparent px-0 hover:ring-0 focus-visible:ring-0 focus-within:ring-0 focus:ring-0 w-[75%] focus:outline-none"
                placeholder="Search"
              />
            </div>
          </div>

          {/* Scrollable Conversation List */}
          <div className={`flex-1 overflow-y-auto min-h-0 p-2 ${!isCollapsed ? 'opacity-100' : 'hidden'}`}>
            {conversationList}
          </div>

          {/* Collapse Button (when collapsed) */}
          {isCollapsed && (
            <div className="mt-auto p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
              >
                <PanelRightClose className='size-4' />
              </Button>
            </div>
          )}

          {/* User Section - Fixed at Bottom */}
          <div className="p-2 border-t border-border">
            <motion.div
              className="w-full"
              transition={{
                duration: animationDuration,
                ease: "easeInOut"
              }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative h-12 w-full overflow-hidden ${!isCollapsed && 'px-2'}`}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center"
                      initial={false}
                      animate={{
                        justifyContent: 'flex-start',
                        paddingLeft: '0.5rem',
                      }}
                      transition={{
                        duration: animationDuration,
                        ease: "easeInOut"
                      }}
                    >
                      <img src={avatar} alt="avatar" className='rounded-lg shrink-0 size-8' />
                      <motion.div
                        className="flex flex-1 justify-between items-center m-2"
                        animate={{
                          width: isCollapsed ? 0 : 'auto',
                          opacity: isCollapsed ? 0 : 1,
                        }}
                        transition={{
                          duration: animationDuration,
                          ease: "easeInOut"
                        }}
                        style={{
                          originX: 0,
                        }}
                      >
                        <div className='flex flex-col justify-start w-full'>
                          <span className='flex justify-start font-semibold text-sm truncate whitespace-nowrap'>
                            {isLoading ? 'Loading...' : user?.username || 'Guest'}
                          </span>
                          <span className='flex justify-start font-normal text-xs truncate whitespace-nowrap'>
                            {isLoading ? 'Loading...' : user?.email || 'Guest'}
                          </span>
                        </div>
                        <ChevronsUpDown className='mr-2 shrink-0 size-3' />
                      </motion.div>
                    </motion.div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="z-20 rounded-lg w-[200px]"
                  side="right"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <img src={avatar} alt="avatar" className='rounded-lg shrink-0 size-8' />
                      <div className="flex-1 grid text-left text-sm leading-tight">
                        <span className="font-semibold truncate">
                          {isLoading ? 'Loading...' : user?.username || 'Guest'}
                        </span>
                        <span className="text-xs truncate">
                          {isLoading ? 'Loading...' : user?.email || 'Guest'}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <ThemeSettings />
                    <DropdownMenuItem onSelect={() => handleOpenModal('settings')}>
                      <Settings className='mr-1.5 size-3' /> Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleOpenModal('profile')}>
                      <SquareUser className='mr-1.5 size-3' /> Profile
                      <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  {user && (
                    <DropdownMenuItem>
                      <LogOut className='mr-1.5 size-3' /> Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}
                  {!user && (
                    <DropdownMenuItem>
                      <LogIn className='mr-1.5 size-3' /> Sign In
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>
      </div>
      <Dialog open={openModal === 'theme'} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Theme Settings</DialogTitle>
          </DialogHeader>
          <div className="py-4">Theme settings content goes here</div>
        </DialogContent>
      </Dialog>

      <Dialog open={openModal === 'settings'} onOpenChange={handleCloseModal}>
        <DialogContent className="gap-0 p-0 sm:max-w-[825px]">
          <div className="flex h-[600px]">
            {/* Settings Sidebar */}
            <div className="border-r border-border w-[200px] shrink-0">
              <DialogHeader className="p-4 pb-2">
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-1 p-2">
                {[
                  { value: 'general', label: 'General', icon: Settings2 },
                  { value: 'models', label: 'Models', icon: BrainCircuit },
                  { value: 'privacy', label: 'Privacy', icon: Shield },
                  { value: 'notifications', label: 'Notifications', icon: Bell }
                ].map((item) => (
                  <Button
                    key={item.value}
                    variant={selectedSetting === item.value ? "secondary" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => setSelectedSetting(item.value)}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-12 overflow-y-auto">
              {selectedSetting === 'general' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="language">Language</Label>
                    <Select>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="auto-save">Auto-save conversations</Label>
                    <Switch id="auto-save" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="cet">Central European Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {selectedSetting === 'models' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="default-model">Default Model</Label>
                    <Select>
                      <SelectTrigger id="default-model">
                        <SelectValue placeholder="Select default model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude-2">Claude 2</SelectItem>
                        <SelectItem value="palm">PaLM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="temperature">Default Temperature</Label>
                    <Slider id="temperature" min={0} max={2} step={0.1} defaultValue={[0.7]} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="max-tokens">Default Max Tokens</Label>
                    <Input id="max-tokens" type="number" placeholder="Enter max tokens" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="stream-response">Stream Response</Label>
                    <Switch id="stream-response" />
                  </div>
                </div>
              )}

              {selectedSetting === 'privacy' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="data-collection">Allow data collection for improvement</Label>
                    <Switch id="data-collection" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="third-party-sharing">Share data with third parties</Label>
                    <Switch id="third-party-sharing" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="data-retention">Data Retention Period</Label>
                    <Select>
                      <SelectTrigger id="data-retention">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {selectedSetting === 'notifications' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch id="email-notifications" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch id="push-notifications" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="notification-frequency">Notification Frequency</Label>
                    <Select>
                      <SelectTrigger id="notification-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openModal === 'profile'} onOpenChange={handleCloseModal}>
        <DialogContent className="gap-0 p-12 sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          <div className="gap-4 grid py-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Avatar</Button>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="expertise">Areas of Expertise</Label>
              <Select>
                <SelectTrigger id="expertise">
                  <SelectValue placeholder="Select areas of expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">Artificial Intelligence</SelectItem>
                  <SelectItem value="ml">Machine Learning</SelectItem>
                  <SelectItem value="nlp">Natural Language Processing</SelectItem>
                  <SelectItem value="cv">Computer Vision</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="preferred-models">Preferred Models</Label>
              <Select>
                <SelectTrigger id="preferred-models">
                  <SelectValue placeholder="Select preferred models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-2">Claude 2</SelectItem>
                  <SelectItem value="palm">PaLM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="public-profile">Make profile public</Label>
              <Switch id="public-profile" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Sidebar;

