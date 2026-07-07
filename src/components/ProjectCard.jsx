import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Chip, Dialog, IconButton, Grid } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import absUrl from '../utils/urls';

const CAT_COLORS = { Branding:'#FF4757','UI/UX':'#4ECDC4',Motion:'#FFD166',Print:'#95E1D3',Photography:'#F38181',Illustration:'#AA96DA',Other:'#888' };
const MotionBox = motion.create(Box);

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const videoRef = useRef(null);
  const hoverVideoRef = useRef(null);
  const cardRef = useRef(null);
  const isVideo = project.mediaType === 'video';
  const accent = CAT_COLORS[project.category] || '#FF4757';
  const { isDark } = useTheme();

  const bgColor = isDark ? '#141414' : '#ffffff';
  const borderColor = isDark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.08)';
  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';
  const secondaryText = isDark ? '#555' : '#999';

  // Intersection Observer for scroll-based autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Auto-play muted video when in view
          if (hoverVideoRef.current?.paused) {
            hoverVideoRef.current.play().catch(e => console.warn('Auto-play prevented:', e.message));
          }
        } else {
          setInView(false);
          // Pause video when out of view
          if (hoverVideoRef.current && !hoverVideoRef.current.paused) {
            hoverVideoRef.current.pause();
            hoverVideoRef.current.currentTime = 0;
          }
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    if (isVideo && hoverVideoRef.current) {
      hoverVideoRef.current.play().catch(e => console.warn('Play prevented:', e.message));
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (hoverVideoRef.current) {
      hoverVideoRef.current.pause();
      hoverVideoRef.current.currentTime = 0;
    }
  };

  const closeModal = () => { 
    setOpen(false); 
    if (videoRef.current) { 
      videoRef.current.pause(); 
      videoRef.current.currentTime = 0; 
    } 
  };

  return (
    <>
      <Box
        ref={cardRef}
        onClick={() => setOpen(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor
        sx={{
          position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'none',
          border: `1px solid ${hovered ? accent + '30' : borderColor}`,
          background: bgColor,
          aspectRatio: index % 7 === 3 ? '3/4' : index % 5 === 2 ? '16/10' : '1/1',
          opacity: 0, animation: `fadeInUp .6s ease ${index * .07}s forwards`,
          transition: 'border-color .3s, box-shadow .3s, transform .3s',
          boxShadow: hovered ? `0 24px 60px ${isDark ? 'rgba(0,0,0,.7)' : 'rgba(0,0,0,.2)'}` : 'none',
          transform: hovered ? 'translateY(-4px)' : 'none',
        }}
      >
        {/* Media - Auto-play video on hover/scroll or show thumbnail */}
        {isVideo ? (
          <>
              {(hovered || inView) && project.mediaUrl ? (
              // Auto-playing video on hover/scroll
              <Box
                component="video"
                ref={hoverVideoRef}
                src={absUrl(project.mediaUrl)}
                muted
                loop
                playsInline
                onError={() => console.warn('Video play failed for:', project.title)}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  background: '#000'
                }}
              />
            ) : (
              // Show thumbnail when not hovering/not in view
              <>
                {project.thumbnailUrl ? (
                  <Box
                    component="img"
                    src={absUrl(project.thumbnailUrl)}
                    alt={project.title}
                    onError={() => console.warn('Thumbnail load failed for:', project.title)}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform .6s',
                      transform: hovered ? 'scale(1.04)' : 'scale(1)'
                    }}
                  />
                ) : (
                  <Box sx={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg,#1c1c1c,#111)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <PlayArrowIcon sx={{ fontSize: 56, color: '#333' }} />
                  </Box>
                )}
              </>
            )}
            <Box sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'rgba(0,0,0,.75)',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: '100px',
              px: 1.5,
              py: .4,
              display: 'flex',
              alignItems: 'center',
              gap: .6,
              backdropFilter: 'blur(8px)',
              zIndex: 2
            }}>
              <PlayArrowIcon sx={{ fontSize: 10, color: accent }} />
              <Typography sx={{ fontSize: '.6rem', color: accent, fontWeight: 700 }}>VIDEO</Typography>
            </Box>
          </>
        ) : (
            : <Box
            component="img"
            src={absUrl(project.mediaUrl)}
            alt={project.title}
            loading="lazy"
            onError={() => console.warn('Image load failed for:', project.title)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform .6s',
              transform: hovered ? 'scale(1.04)' : 'scale(1)'
            }}
          />
        )}

        {/* Gradient overlay always */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: isDark 
            ? 'linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.2) 45%, transparent 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 45%, transparent 100%)',
          opacity: hovered ? 1 : .6,
          transition: 'opacity .35s',
          pointerEvents: 'none'
        }} />

        {/* Color accent top border on hover */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: accent,
          opacity: hovered ? 1 : 0,
          transition: 'opacity .3s',
          pointerEvents: 'none'
        }} />

        {/* Bottom info */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, zIndex: 2 }}>
          <Typography sx={{
            fontSize: '.62rem',
            color: accent,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            fontWeight: 700,
            mb: .5
          }}>
            {project.category}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Box>
              <Typography sx={{
                fontFamily: 'Space Grotesk',
                fontWeight: 700,
                fontSize: '.95rem',
                color: textColor,
                lineHeight: 1.3
              }}>
                {project.title}
              </Typography>
              {project.year && (
                <Typography sx={{ fontSize: '.68rem', color: secondaryText, mt: .3 }}>
                  {project.client ? `${project.client} · ` : ''}{project.year}
                </Typography>
              )}
            </Box>
            <Box sx={{
              width: 34,
              height: 34,
              background: accent,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-45deg)',
              transition: 'all .3s',
              flexShrink: 0,
              ml: 1
            }}>
              <NorthEastIcon sx={{ fontSize: 16, color: '#fff' }} />
            </Box>
          </Box>
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: .7,
            mt: 1.2,
            px: 2,
            py: .6,
            border: isDark ? '1px solid rgba(255,255,255,.15)' : '1px solid rgba(0,0,0,.15)',
            borderRadius: '100px',
            background: isDark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)',
            backdropFilter: 'blur(8px)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all .3s .05s'
          }}>
            <Typography sx={{ fontSize: '.72rem', color: textColor, fontWeight: 600 }}>
              {isVideo ? 'Play Video' : 'View Casestudy'}
            </Typography>
            <NorthEastIcon sx={{ fontSize: 11, color: accent }} />
          </Box>
        </Box>

        {/* Color palette dots */}
        {project.colorPalette?.length > 0 && (
          <Box sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            gap: .5,
            opacity: hovered ? 1 : 0,
            transition: 'opacity .3s',
            zIndex: 3
          }}>
            {project.colorPalette.slice(0, 4).map((c, i) => (
              <Box key={i} sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: c,
                border: '1.5px solid rgba(255,255,255,.25)',
                boxShadow: '0 2px 8px rgba(0,0,0,.5)'
              }} />
            ))}
          </Box>
        )}
      </Box>

      {/* Case Study Modal */}
      <Dialog open={open} onClose={closeModal} maxWidth="md" fullWidth PaperProps={{
        sx: {
          borderRadius: '20px',
          overflow: 'hidden',
          maxHeight: '92vh'
        }
      }}>
        <IconButton onClick={closeModal} sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          background: 'rgba(0,0,0,.6)',
          color: '#F0EDE8',
          '&:hover': { background: 'rgba(0,0,0,.9)' }
        }}>
          <CloseIcon />
        </IconButton>

        {/* Hero media */}
        <Box sx={{
          background: '#000',
          position: 'relative',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isVideo ? (
            <video
              ref={videoRef}
              src={absUrl(project.mediaUrl)}
              controls
              autoPlay
              poster={absUrl(project.thumbnailUrl)}
              onError={() => console.warn('Modal video error for:', project.title)}
              style={{
                width: '100%',
                maxHeight: '55vh',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                background: '#000',
                borderRadius: '4px'
              }}
            />
          ) : (
            <Box
              component="img"
              src={absUrl(project.mediaUrl)}
              alt={project.title}
              onError={() => console.warn('Modal image error for:', project.title)}
              sx={{
                width: '100%',
                maxHeight: '55vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          )}
        </Box>

        {/* Info */}
        <Box sx={{ p: 3, overflowY: 'auto' }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
            flexWrap: 'wrap',
            gap: 1
          }}>
            <Box>
              <Chip label={project.category} size="small" sx={{
                background: accent + '15',
                color: accent,
                border: `1px solid ${accent}30`,
                mb: 1
              }} />
              <Typography variant="h5" sx={{
                fontFamily: 'Space Grotesk',
                fontWeight: 700,
                color: '#F0EDE8'
              }}>
                {project.title}
              </Typography>
              {project.client && (
                <Typography sx={{ color: '#555', fontSize: '.85rem', mt: .3 }}>
                  Client: {project.client} {project.year ? `· ${project.year}` : ''}
                </Typography>
              )}
            </Box>
            {project.colorPalette?.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {project.colorPalette.map((c, i) => (
                  <Box key={i} sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '7px',
                    background: c,
                    border: '1px solid rgba(255,255,255,.1)',
                    title: c
                  }} />
                ))}
              </Box>
            )}
          </Box>

          {project.description && (
            <Typography sx={{
              color: '#888',
              lineHeight: 1.75,
              fontSize: '.9rem',
              mb: 2
            }}>
              {project.fullDescription || project.description}
            </Typography>
          )}

          {/* Tools */}
          {project.tools?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography sx={{
                fontSize: '.68rem',
                color: '#444',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                mb: 1
              }}>
                Tools Used
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.tools.map((t, i) => (
                  <Chip key={i} label={t} size="small" sx={{
                    background: 'rgba(255,255,255,.04)',
                    color: '#888',
                    border: '1px solid rgba(255,255,255,.08)'
                  }} />
                ))}
              </Box>
            </Box>
          )}

          {/* Tags */}
          {project.tags?.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {project.tags.map((t, i) => (
                <Chip key={i} label={`#${t}`} size="small" sx={{
                  background: 'transparent',
                  color: '#444',
                  border: '1px solid rgba(255,255,255,.06)',
                  fontSize: '.7rem'
                }} />
              ))}
            </Box>
          )}

          {/* Case study extra images */}
          {project.caseStudyImages?.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography sx={{
                fontSize: '.68rem',
                color: '#444',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                mb: 1.5
              }}>
                Case Study
              </Typography>
              <Grid container spacing={1.5}>
                {project.caseStudyImages.map((img, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box sx={{ borderRadius: '10px', overflow: 'hidden' }}>
                      <Box
                        component="img"
                        src={img.url}
                        alt={img.caption || `Case ${i+1}`}
                        onError={() => console.warn('Case study image error:', img.url)}
                        sx={{
                          width: '100%',
                          aspectRatio: '16/9',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      {img.caption && (
                        <Typography sx={{
                          fontSize: '.72rem',
                          color: '#555',
                          mt: .5,
                          px: .5
                        }}>
                          {img.caption}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
}
