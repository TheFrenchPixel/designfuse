import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Share2, Upload, FileImage, FileText, File, Calendar, User, LinkIcon, History, Mail, MessageCircle, Twitter, Facebook, Linkedin, Instagram, Award, Camera, FolderOpen, Languages } from 'lucide-react';
import { getBriefs, Brief } from '@/lib/storage';
import { getBadges, incrementShareCount, updateBadges, Badge as BadgeType } from '@/lib/badges';
import { getTranslation, getCurrentLanguage, setCurrentLanguage, Translation } from '@/lib/translations';
import { toast } from 'sonner';

interface DesignFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  url: string;
}

interface StoredDesignFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  url: string;
}

interface UserProfile {
  bio: string;
  portfolioLink: string;
}

export default function Profile() {
  const [designs, setDesigns] = useState<DesignFile[]>([]);
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [profile, setProfile] = useState<UserProfile>({ bio: '', portfolioLink: '' });
  const [currentLanguage, setCurrentLanguageState] = useState(getCurrentLanguage());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const t = (key: keyof Translation) => getTranslation(key, currentLanguage);

  useEffect(() => {
    loadDesigns();
    setBriefs(getBriefs());
    setBadges(getBadges());
    loadProfile();
  }, []);

  const loadDesigns = () => {
    const storedDesigns = localStorage.getItem('designFiles');
    if (storedDesigns) {
      const parsed: StoredDesignFile[] = JSON.parse(storedDesigns);
      setDesigns(parsed.map((design: StoredDesignFile) => ({
        ...design,
        uploadedAt: new Date(design.uploadedAt)
      })));
    }
  };

  const loadProfile = () => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  };

  const saveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    toast.success('Profile updated! 👤');
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    setCurrentLanguageState(language);
    toast.success(`Language changed to ${language === 'en' ? 'English' : language === 'es' ? 'Español' : 'Français'}! 🌍`);
  };

  const processFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newDesign: DesignFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date(),
          url: e.target?.result as string
        };

        const updatedDesigns = [...designs, newDesign];
        setDesigns(updatedDesigns);
        localStorage.setItem('designFiles', JSON.stringify(updatedDesigns));
        toast.success(`${file.name} uploaded successfully! 📁`);
        
        // Check for new badges after upload
        const earnedBadges = updateBadges();
        if (earnedBadges.length > 0) {
          setBadges(getBadges());
          toast.success(`🏆 Badge earned: ${earnedBadges[0].name}!`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    processFiles(files);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    processFiles(files);

    // Reset input
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const handleShare = (platform: string, content: string, title: string) => {
    let shareText = content;
    
    if (profile.bio) {
      shareText += `\n\n👤 About the designer: ${profile.bio}`;
    }
    
    if (profile.portfolioLink) {
      shareText += `\n\n🔗 Portfolio: ${profile.portfolioLink}`;
    }

    const encodedText = encodeURIComponent(shareText);
    const encodedTitle = encodeURIComponent(title);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'email': {
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}`;
        break;
      }
      case 'whatsapp': {
        shareUrl = `https://wa.me/?text=${encodedText}`;
        break;
      }
      case 'twitter': {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      }
      case 'facebook': {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`;
        break;
      }
      case 'linkedin': {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodedTitle}&summary=${encodedText}`;
        break;
      }
      case 'instagram': {
        navigator.clipboard.writeText(shareText);
        toast.success('Content copied to clipboard! Paste it in your Instagram story or post 📋');
        incrementShareCount();
        const earnedBadges = updateBadges();
        if (earnedBadges.length > 0) {
          setBadges(getBadges());
          toast.success(`🏆 Badge earned: ${earnedBadges[0].name}!`);
        }
        return;
      }
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
      toast.success('Opening share dialog! 📤');
      incrementShareCount();
      const earnedBadges = updateBadges();
      if (earnedBadges.length > 0) {
        setBadges(getBadges());
        toast.success(`🏆 Badge earned: ${earnedBadges[0].name}!`);
      }
    }
  };

  const handleShareBrief = (brief: Brief, platform: string) => {
    const shareText = `🎨 ${brief.title}\n\n${brief.overview}\n\n✨ ${t('creativeSpark')}: ${brief.creativeSpark}`;
    handleShare(platform, shareText, brief.title);
  };

  const handleShareDesign = (design: DesignFile, platform: string) => {
    const shareText = `Check out my design: ${design.name}\n\n${t('uploaded')} on ${design.uploadedAt.toLocaleDateString()}`;
    handleShare(platform, shareText, `Design: ${design.name}`);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return FileImage;
    if (type === 'application/pdf' || type.startsWith('text/')) return FileText;
    return File;
  };

  const earnedBadges = badges.filter(badge => badge.earned);
  const totalBadges = badges.length;

  return (
    <div className="min-h-screen bg-slate-900 p-3 pb-20 md:pb-4 text-sm">
      <div className="max-w-4xl mx-auto space-y-5">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-teal-400 mb-2">{t('profileTitle')}</h1>
          <p className="text-slate-400 text-xs md:text-sm">{t('managePortfolio')}</p>
        </div>

        {/* User Bio and Portfolio Link */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-teal-400 flex items-center text-base">
              <User className="w-4 h-4 mr-2" />
              {t('aboutYou')}
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              {t('shareStory')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-slate-300 text-xs">{t('biography')}</Label>
              <Textarea
                id="bio"
                placeholder={t('tellUsAbout')}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[80px] text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio" className="text-slate-300 text-xs">{t('portfolioLink')}</Label>
              <div className="flex space-x-2">
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://your-portfolio.com"
                  value={profile.portfolioLink}
                  onChange={(e) => setProfile({ ...profile, portfolioLink: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 text-xs"
                />
                <Button
                  onClick={saveProfile}
                  className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-3"
                >
                  {t('save')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-teal-400 flex items-center text-base">
              <Award className="w-4 h-4 mr-2" />
              {t('achievements')}
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              {earnedBadges.length} of {totalBadges} {t('badgesEarned')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {earnedBadges.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="text-base font-medium text-slate-300 mb-2">{t('noBadgesYet')}</h3>
                <p className="text-slate-400 text-xs">{t('completeChallenges')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {earnedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-slate-700 rounded-lg p-3 text-center hover:bg-slate-600 transition-colors"
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <h4 className="text-teal-400 font-medium text-xs mb-1">{badge.name}</h4>
                    <p className="text-slate-400 text-xs mb-2">{badge.description}</p>
                    {badge.earnedDate && (
                      <Badge variant="secondary" className="text-xs bg-teal-500/20 text-teal-400 border-teal-500/30">
                        {badge.earnedDate.toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Brief History */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-teal-400 flex items-center text-base">
              <History className="w-4 h-4 mr-2" />
              {t('briefHistory')}
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              {briefs.length} {t('briefsGenerated')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {briefs.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="text-base font-medium text-slate-300 mb-2">{t('noBriefsYet')}</h3>
                <p className="text-slate-400 text-xs">{t('generateFirst')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {briefs.slice(-5).reverse().map((brief) => (
                  <div
                    key={brief.id}
                    className="p-3 bg-slate-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-teal-400 font-medium text-sm">{brief.title}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white text-xs px-2 py-1"
                          >
                            <Share2 className="w-3 h-3 mr-1" />
                            {t('share')}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem onClick={() => handleShareBrief(brief, 'email')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                            <Mail className="w-3 h-3 mr-2" />
                            {t('email')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareBrief(brief, 'whatsapp')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                            <MessageCircle className="w-3 h-3 mr-2" />
                            {t('whatsapp')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareBrief(brief, 'twitter')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                            <Twitter className="w-3 h-3 mr-2" />
                            {t('twitter')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareBrief(brief, 'facebook')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                            <Facebook className="w-3 h-3 mr-2" />
                            {t('facebook')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareBrief(brief, 'linkedin')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                            <Linkedin className="w-3 h-3 mr-2" />
                            {t('linkedin')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareBrief(brief, 'instagram')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                            <Instagram className="w-3 h-3 mr-2" />
                            {t('instagram')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-slate-300 text-xs mb-2">{brief.overview}</p>
                    <div className="flex items-center text-xs text-slate-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      {brief.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {briefs.length > 5 && (
                  <p className="text-center text-slate-400 text-xs">
                    {t('showing')} {t('latest')} 5 {t('briefs')}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Designs */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-teal-400 flex items-center text-base">
              <Upload className="w-4 h-4 mr-2" />
              {t('uploadDesigns')}
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              {t('shareCreative')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Upload Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Choose from Computer */}
                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="text-slate-300 text-xs">
                    {t('chooseFromComputer')}
                  </Label>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-teal-500 hover:bg-slate-700/50 transition-colors">
                      <FolderOpen className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400 text-xs mb-2">{t('browseFiles')}</p>
                      <Button variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white pointer-events-none text-xs px-3 py-1">
                        {t('selectFiles')}
                      </Button>
                    </div>
                    <Input
                      ref={fileInputRef}
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt,.sketch,.fig,.ai,.psd"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </Label>
                </div>

                {/* Take Photo */}
                <div className="space-y-2">
                  <Label htmlFor="camera-capture" className="text-slate-300 text-xs">
                    {t('takePhoto')}
                  </Label>
                  <Label htmlFor="camera-capture" className="cursor-pointer">
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-teal-500 hover:bg-slate-700/50 transition-colors">
                      <Camera className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400 text-xs mb-2">{t('useCamera')}</p>
                      <Button variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white pointer-events-none text-xs px-3 py-1">
                        {t('takePhoto')}
                      </Button>
                    </div>
                    <Input
                      ref={cameraInputRef}
                      id="camera-capture"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleCameraCapture}
                      className="hidden"
                    />
                  </Label>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                <strong>Computer:</strong> Images, PDFs, Documents, Sketch, Figma, AI, PSD files<br />
                <strong>Camera:</strong> Take photos directly from your phone or tablet
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Designs List */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-teal-400 text-base">{t('yourDesigns')}</CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              {designs.length} {t('designsUploaded')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {designs.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="text-base font-medium text-slate-300 mb-2">{t('noDesignsYet')}</h3>
                <p className="text-slate-400 text-xs">{t('uploadFirst')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {designs.map((design) => {
                  const FileIcon = getFileIcon(design.type);
                  return (
                    <div
                      key={design.id}
                      className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileIcon className="w-6 h-6 text-teal-400" />
                        <div>
                          <h4 className="text-teal-400 font-medium text-sm">{design.name}</h4>
                          <p className="text-slate-400 text-xs">
                            {formatFileSize(design.size)} • {t('uploaded')} {design.uploadedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {design.type.startsWith('image/') && (
                          <img
                            src={design.url}
                            alt={design.name}
                            className="w-10 h-10 object-cover rounded border border-slate-600"
                          />
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white text-xs px-2 py-1"
                            >
                              <Share2 className="w-3 h-3 mr-1" />
                              {t('share')}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-800 border-slate-700">
                            <DropdownMenuItem onClick={() => handleShareDesign(design, 'email')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                              <Mail className="w-3 h-3 mr-2" />
                              {t('email')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareDesign(design, 'whatsapp')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                              <MessageCircle className="w-3 h-3 mr-2" />
                              {t('whatsapp')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareDesign(design, 'twitter')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                              <Twitter className="w-3 h-3 mr-2" />
                              {t('twitter')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareDesign(design, 'facebook')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                              <Facebook className="w-3 h-3 mr-2" />
                              {t('facebook')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareDesign(design, 'linkedin')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                              <Linkedin className="w-3 h-3 mr-2" />
                              {t('linkedin')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareDesign(design, 'instagram')} className="text-slate-300 hover:bg-slate-700 hover:text-teal-400 text-xs">
                              <Instagram className="w-3 h-3 mr-2" />
                              {t('instagram')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Language Selector */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Languages className="w-4 h-4 text-teal-400" />
                <Label className="text-slate-300 text-xs">{t('language')}</Label>
              </div>
              <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white text-xs">
                  <SelectValue placeholder={t('selectLanguage')} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="en" className="text-slate-300 hover:bg-slate-700 text-xs">🇺🇸 English</SelectItem>
                  <SelectItem value="es" className="text-slate-300 hover:bg-slate-700 text-xs">🇪🇸 Español</SelectItem>
                  <SelectItem value="fr" className="text-slate-300 hover:bg-slate-700 text-xs">🇫🇷 Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}